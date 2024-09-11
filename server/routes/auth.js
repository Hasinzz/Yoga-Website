const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');
const mongoose = require('mongoose');

const router = express.Router();


router.post('/register', async (req, res) => {
  const { email, password, twoFactorEnabled } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, twoFactorEnabled });
    await user.save();
    res.status(201).send('User created');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(400).send('Error registering user');
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid credentials');
    }

    if (user.twoFactorEnabled) {
      const otp = speakeasy.totp({
        secret: user.otpSecret || 'your_secret_key',  
        encoding: 'base32'
      });
      user.otp = otp;
      user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);  
      await user.save();

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Your OTP for Login',
        text: `Your OTP is ${otp}. It is valid for 5 minutes.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send('Error sending OTP');
        }
        res.status(200).send('OTP sent');
      });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).send('Error logging in');
  }
});


router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.otp || user.otpExpires < Date.now()) {
      return res.status(400).send('OTP is invalid or expired');
    }

    if (otp !== user.otp) {
      return res.status(400).send('Incorrect OTP');
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(400).send('Error verifying OTP');
  }
});

module.exports = router;
