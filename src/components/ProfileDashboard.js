import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileDashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setError('User not found');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {user ? (
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Welcome, {user.email}</h1>
          <button onClick={handleLogout} style={{
            width: '200px',
            height: '40px',
            backgroundColor: '#3498db',
            color: '#ecf0f1',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            ':hover': {
              backgroundColor: '#2980b9'
            }
          }}>Logout</button>
        </div>
      ) : (
        <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '100px' }}>Loading...</p>
      )}
    </div>
  );
};

export default ProfileDashboard;