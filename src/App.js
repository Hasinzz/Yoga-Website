import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import ProfileDashboard from './components/ProfileDashboard';

const App = () => {
  return (
    <Router>
      <div className="app-container" style={{
        fontFamily: "'Arial', sans-serif",
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <style jsx global>{`
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
          }

          a {
            text-decoration: none;
            color: #ecf0f1;
          }

          a:hover {
            color: #2980b9;
          }
        `}</style>

        <Navbar style={{
          backgroundColor: '#2c3e50',
          color: '#ecf0f1',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }} />
        <main style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/login" element={
              <Login style={{
                maxWidth: '400px',
                margin: '0 auto',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                backgroundColor: '#fff'
              }}
              />
            } />
            <Route path="/register" element={
              <Register style={{
                maxWidth: '400px',
                margin: '0 auto',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                backgroundColor: '#fff'
              }}
              />
            } />
            <Route path="/profile" element={
              <ProfileDashboard style={{
                maxWidth: '600px',
                margin: '0 auto',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                backgroundColor: '#fff'
              }}
              />
            } />
            <Route path="/" element={
              <div style={{
                textAlign: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#2c3e50',
                marginTop: '200px'
              }}>Welcome to My App</div>
            } />
          </Routes>
        </main>
        <Footer style={{
          backgroundColor: '#34495e',
          color: '#ecf0f1',
          textAlign: 'center',
          padding: '10px 0',
          borderTop: '1px solid #3498db'
        }} />
      </div>
    </Router>
  );
};

export default App;