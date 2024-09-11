import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '10px 20px',
    borderBottom: '1px solid #3498db'
  }}>
    <Link to="/" style={{ marginRight: '10px', textDecoration: 'none' }}>Home</Link>
    <Link to="/login" style={{ marginRight: '10px', textDecoration: 'none' }}>Login</Link>
    <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
    <Link to="/profile" style={{ textDecoration: '10px', textDecoration: 'none' }}>Profile</Link>
  </nav>
);

export default Navbar;