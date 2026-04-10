import React from "react";

const Certificate = ({ score, total, skill, level, onClose }) => {
  const date = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
      <div className="bg-mesh"></div>
      
      <div style={{
        background: 'rgba(20, 20, 30, 0.95)',
        border: '2px solid var(--primary-cyan)',
        borderRadius: '16px',
        padding: '60px',
        maxWidth: '800px',
        width: '100%',
        boxShadow: '0 0 40px rgba(0, 242, 254, 0.2)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        
        <div style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer', fontSize: '1.5rem', color: 'var(--text-muted)' }} onClick={onClose}>
          ✕
        </div>

        <h1 style={{ fontSize: '3.5rem', margin: '0 0 10px 0', fontFamily: 'serif', color: 'var(--primary-cyan)', textTransform: 'uppercase', letterSpacing: '4px' }}>
          Certificate of Mastery
        </h1>
        <p style={{ color: 'var(--primary-purple)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '40px' }}>
          DevAIchemy Skills Validation
        </p>

        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '10px' }}>This is to certify that</p>
        <h2 style={{ fontSize: '2.5rem', color: 'white', margin: '0 0 30px 0', borderBottom: '1px solid var(--glass-border)', display: 'inline-block', paddingBottom: '5px' }}>
          DevAIchemy Alchemist
        </h2>

        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '10px' }}>has successfully completed the</p>
        <h3 style={{ fontSize: '2rem', color: '#10b981', margin: '0 0 10px 0' }}>{skill} - {level} Quest</h3>
        
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '40px' }}>
          Achieving a final score of <strong style={{ color: 'white' }}>{score}/{total}</strong>.
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '40px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ borderBottom: '1px solid var(--glass-border)', width: '200px', marginBottom: '10px' }}></div>
            <p style={{ color: 'var(--text-muted)' }}>Date: {date}</p>
          </div>
          
          <div style={{ 
            width: '100px', height: '100px', borderRadius: '50%', 
            background: 'linear-gradient(135deg, var(--primary-cyan), var(--primary-purple))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
            border: '4px solid rgba(255,255,255,0.1)'
          }}>
             <span style={{ fontSize: '2rem' }}>Seal</span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ borderBottom: '1px solid var(--glass-border)', width: '200px', marginBottom: '10px' }}></div>
            <p style={{ color: 'var(--text-muted)' }}>DevAIchemy System</p>
          </div>
        </div>
      </div>

      <button onClick={() => window.print()} style={{
        marginTop: '30px', padding: '12px 24px', background: 'var(--primary-purple)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', zIndex: 10
      }}>
        🖨️ Print Certificate
      </button>

    </div>
  );
};

export default Certificate;
