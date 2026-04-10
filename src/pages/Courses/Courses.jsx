import React from "react";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";

const Courses = () => {
  return (
    <div className="app-container">
      <div className="bg-mesh"></div>
      <Navbar />

      <main style={{ padding: '2rem 3rem', maxWidth: '1200px', margin: '0 auto' }} className="animate-fade-in">
        <header style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Magical <span style={{ color: '#3b82f6' }}>Library</span></h1>
          <p style={{ color: 'var(--text-muted)' }}>Curated courses from master developers.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <Card title="Fullstack React & Node" description="Master the MERN stack with 5 real projects." icon="📘" color="#3b82f6">
            <button style={btnStyle}>Enroll</button>
          </Card>
          <Card title="AI Agents in Python" description="Learn to build autonomous LLM agents." icon="📙" color="#3b82f6">
            <button style={btnStyle}>Enroll</button>
          </Card>
          <Card title="Web3 Smart Contracts" description="Solidity and Ethereum fundamentals." icon="📗" tag="Premium" color="#eab308">
            <button style={btnStyle}>Unlock</button>
          </Card>
        </div>
      </main>
    </div>
  );
};

const btnStyle = {
  width: '100%', padding: '10px', background: 'rgba(59, 130, 246, 0.2)', border: '1px solid #3b82f6',
  color: '#3b82f6', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
};

export default Courses;
