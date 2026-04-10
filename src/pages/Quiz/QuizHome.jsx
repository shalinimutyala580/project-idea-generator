import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import { useNavigate } from "react-router-dom";

const QuizHome = () => {
  const [skill, setSkill] = useState("");
  const [isSkillSet, setIsSkillSet] = useState(false);

  const handleStart = () => {
    if (!skill.trim()) return alert("Enter a skill first!");
    setIsSkillSet(true);
  };

  return (
    <div className="app-container">
      <div className="bg-mesh"></div>
      <Navbar />

      <main style={{ padding: '2rem 3rem', maxWidth: '1200px', margin: '0 auto' }} className="animate-fade-in">
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Skill <span style={{ color: 'var(--primary-purple)' }}>Quests</span></h1>
          <p style={{ color: 'var(--text-muted)' }}>Validate your mastery in any alchemy.</p>
        </header>

        {!isSkillSet ? (
          <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '20px' }}>What skill do you want to test?</h2>
            <input 
              type="text" 
              placeholder="e.g. React, Node.js, Python" 
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              style={{
                width: '100%', padding: '16px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--glass-border)', color: 'white', fontSize: '1rem', marginBottom: '20px'
              }} 
            />
            <button onClick={handleStart} style={{
               padding: '16px 32px', borderRadius: '12px',
               background: 'linear-gradient(90deg, var(--primary-purple) 0%, #ec4899 100%)',
               border: 'none', color: 'white', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer'
            }}>
              Select Difficulty ➔
            </button>
          </div>
        ) : (
          <div>
            <h3 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--primary-cyan)' }}>Select Difficulty for {skill.charAt(0).toUpperCase() + skill.slice(1)}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <Card title="Novice" description="Basic fundamentals and syntaxes." icon="🟢" route={`/quiz/Beginner?skill=${skill}`} color="#10b981" />
              <Card title="Apprentice" description="Hooks, styling, and framework specifics." icon="🔵" route={`/quiz/Intermediate?skill=${skill}`} color="#3b82f6" />
              <Card title="Adept" description="Architecture and performance optimization." icon="🟣" route={`/quiz/Advanced?skill=${skill}`} color="#a855f7" />
              <Card title="Grandmaster" description="Systems design and distributed architecture." icon="🔴" route={`/quiz/Pro?skill=${skill}`} color="#ef4444" tag="Extreme" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizHome;
