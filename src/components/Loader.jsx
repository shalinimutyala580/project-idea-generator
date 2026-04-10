import React from 'react';

const Loader = ({ text = "Processing..." }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <span className="loader"></span>
      <p style={{ marginTop: '1rem', color: 'var(--primary-cyan)', fontSize: '0.9rem', letterSpacing: '1px' }}>{text}</p>
    </div>
  );
};

export default Loader;
