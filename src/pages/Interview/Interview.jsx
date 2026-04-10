import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { getInterviewQuestions } from "../../data/interviewData";

const Interview = () => {
  const [skill, setSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [activeIdx, setActiveIdx] = useState(null);

  const handleGenerate = () => {
    if (!skill.trim()) return alert("Please enter a skill!");
    setLoading(true);
    setTimeout(() => {
      setQuestions(getInterviewQuestions(skill));
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="app-container">
      <div className="bg-mesh"></div>
      <Navbar />

      <main style={{ padding: '2rem 3rem', maxWidth: '1000px', margin: '0 auto' }} className="animate-fade-in">
        
        {!questions && !loading && (
          <div className="glass-panel" style={{ padding: '40px', marginTop: '40px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-cyan)', marginBottom: '10px' }}>Interview Oracle</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Enter a technology or skill to retrieve top interview questions.</p>

            <input
              type="text"
              placeholder="e.g. React, Docker, System Design..."
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              style={inputStyle}
            />

            <button onClick={handleGenerate} style={buttonStyle}>
              Summon Questions
            </button>
          </div>
        )}

        {loading && (
          <div style={{ marginTop: '100px' }}>
            <Loader text={`Consulting database for ${skill}...`} />
          </div>
        )}

        {questions && !loading && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '2rem', color: 'white' }}>
                Top <span style={{ color: 'var(--primary-cyan)' }}>{skill}</span> Questions
              </h2>
              <button onClick={() => { setQuestions(null); setSkill(""); }} style={{
                padding: '8px 16px', background: 'transparent', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '8px', cursor: 'pointer'
              }}>
                ⭠ New Search
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {questions.map((item, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                  <div 
                    onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
                    style={{ 
                      padding: '20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      background: activeIdx === idx ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
                      transition: 'background 0.3s'
                    }}
                  >
                    <h3 style={{ fontSize: '1.2rem', margin: 0, color: activeIdx === idx ? 'var(--primary-cyan)' : 'white' }}>
                      {idx + 1}. {item.q}
                    </h3>
                    <span style={{ fontSize: '1.5rem', transform: activeIdx === idx ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                      ▼
                    </span>
                  </div>
                  
                  {activeIdx === idx && (
                    <div style={{ padding: '0 20px 20px 20px', color: '#e2e8f0', lineHeight: '1.6', borderTop: '1px solid var(--glass-border)' }}>
                      <p style={{ marginTop: '15px' }}><strong>Answer:</strong> {item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

const inputStyle = {
  width: '100%', maxWidth: '600px', padding: '16px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)',
  border: '1px solid var(--glass-border)', color: 'white', fontSize: '1rem', marginBottom: '20px',
  boxSizing: 'border-box', display: 'block', margin: '0 auto 20px auto'
};

const buttonStyle = {
  width: '100%', maxWidth: '600px', padding: '16px', borderRadius: '12px',
  background: 'linear-gradient(90deg, var(--primary-cyan) 0%, var(--primary-blue) 100%)',
  border: 'none', color: 'white', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer',
  transition: 'transform 0.2s', textTransform: 'uppercase', letterSpacing: '1px'
};

export default Interview;
