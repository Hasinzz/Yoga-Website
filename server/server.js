const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/auth');
// const userRouter = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
// app.use('/api', userRouter); // Ensure this is the correct route

mongoose.connect('mongodb+srv://vaugheu:Mpassword123@mern-temp.ioj58.mongodb.net/?retryWrites=true&w=majority&appName=mern-temp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
