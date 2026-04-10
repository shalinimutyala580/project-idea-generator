import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <div className="bg-mesh"></div>
      
      <div className="animate-fade-in" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '6rem', color: 'var(--primary-cyan)', margin: 0, fontWeight: 800 }}>404</h1>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Void Connection</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>The transmutation circle broke. This page doesn't exist.</p>
        
        <Link to="/home" style={{
          padding: '12px 24px', background: 'var(--primary-cyan)', color: 'var(--bg-dark)',
          borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold'
        }}>
          Return to Nexus
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
