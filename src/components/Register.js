import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { email, password });
      setMessage('Registration successful! You can now log in.');
      console.log(response.data);  // Log success response to terminal
    } catch (err) {
      setError('Error registering user. Please try again.');
      console.error('Error registering', err);  // Log error to terminal
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '0 auto',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      backgroundColor: '#fff'
    }}>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
          style={{ marginBottom: '10px' }}
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
          style={{ marginBottom: '10px' }}
        />
        <button type="submit">Register</button>
        {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;