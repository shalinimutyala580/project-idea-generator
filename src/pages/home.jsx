import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Achievements from "../features/gemification/Achievements";
import HealthCard from "../features/healthanalyzer/HealthCard";

const FACTS = [
  "Did you know? The first computer programmer was Ada Lovelace, who wrote an algorithm for the Analytical Engine in 1843.",
  "AI origin: The term 'Artificial Intelligence' was first coined by John McCarthy in 1956 at Dartmouth College.",
  "React was originally created by Jordan Walke, a software engineer at Facebook, and first deployed on Facebook's newsfeed in 2011.",
  "Fun fact: There are over 700 distinct programming languages in existence today.",
  "The Apollo 11 Guidance Computer run on only 4KB of RAM, less than a modern digital watch.",
  "The first computer virus was created in 1983 and was called the 'Elk Cloner'."
];

const InterestingFactBanner = () => {
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % FACTS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid var(--glass-border)',
      borderRadius: '16px',
      padding: '1.5rem',
      marginBottom: '3rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
      animation: 'fadeIn 1s ease-out'
    }}>
      <div style={{
        background: 'rgba(0, 242, 254, 0.1)',
        color: 'var(--primary-cyan)',
        padding: '1rem',
        borderRadius: '50%',
        fontSize: '1.5rem'
      }}>
        💡
      </div>
      <div>
        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-cyan)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Dev Fact of the Moment
        </h4>
        <p style={{ margin: 0, color: 'var(--text-main)', fontSize: '1rem', fontStyle: 'italic', transition: 'opacity 0.5s' }} key={factIndex} className="animate-fade-in">
          "{FACTS[factIndex]}"
        </p>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="app-container">
      <div className="bg-mesh"></div>
      <Navbar />

      <main style={{ padding: '3rem', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <header className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 800, margin: '0 0 1rem 0', letterSpacing: '-1px' }}>
            Welcome to the <span style={{ background: 'linear-gradient(135deg, var(--primary-cyan), var(--primary-purple))', WebkitBackgroundClip: 'text', color: 'transparent' }}>Nexus</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Your command center for AI-driven development. Discover learning paths, resume insights, and advanced career tools.
          </p>
        </header>

        <InterestingFactBanner />

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px' }}>
            Active Modules
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          <Card 
            title="AI Chemist" 
            description="Explore a structured learning path, complete topics, and unlock next-level mastery."
            icon="🧪" tag="Learning" route="/learning" color="#3b82f6"
          >
            <div style={{ padding: '12px 16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: '#3b82f6', fontWeight: 'bold', display: 'inline-block' }}>
              Start Learning ⭢
            </div>
          </Card>

          <Card 
            title="Quests" 
            description="Face a professional quiz engine with pass/fail analysis and certificate-style validation."
            icon="🧠" tag="Assessment" route="/quiz" color="#a855f7"
          >
            <div style={{ padding: '12px 16px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '12px', color: '#a855f7', fontWeight: 'bold', display: 'inline-block' }}>
              Begin Quest ⭢
            </div>
          </Card>

          <Card 
            title="Shadow Recruiter" 
            description="Paste your resume and receive a score, keyword analysis, and improvement suggestions."
            icon="📄" tag="Career" route="/resume" color="#ec4899"
          >
            <div style={{ marginTop: '15px', color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Resume insights in seconds
            </div>
          </Card>

          <Card 
            title="Professional Profile" 
            description="Review your saved ideas, quiz streaks, resume history, and badges from one dashboard."
            icon="👤" tag="Profile" route="/profile" color="#14b8a6"
          >
             <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '15px' }}>
              <span style={pillStyle}>Progress</span>
              <span style={pillStyle}>Achievements</span>
            </div>
          </Card>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px' }}>
            Experimental Features
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {/* Advanced Built Features */}
          <HealthCard />
          <Achievements />

          <Card title="Interview Oracle" description="Retrieve structured, essential interview questions tailored for any technology." icon="🎤" route="/interview" color="#eab308">
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
              <span style={pillStyle}>Top 50</span>
              <span style={pillStyle}>Architecture</span>
            </div>
          </Card>

          <Card title="Code sandbox (Beta)" description="Instantly initialize a secure zero-config local environment in seconds." icon="🧪" route="/sandbox" color="#10b981" />
          <Card title="Ghost Coder" description="Simulated Pair programming sessions with a virtual senior engineer." icon="👻" color="#8b5cf6" />
          <Card title="Dev-Duel Arena" description="Challenge fellow alchemists to a fast-paced 10-minute speed build." icon="🔥" tag="Live Multiplayer" color="#ef4444" />
          <Card title="Coffee Break" description="Sit back, relax, and generate context-aware developer humor." icon="☕" color="#f59e0b" />
        </div>

      </main>
    </div>
  );
};

const pillStyle = {
  background: 'rgba(255,255,255,0.05)', 
  padding: '6px 12px', 
  borderRadius: '20px', 
  fontSize: '0.85rem', 
  border: '1px solid rgba(255,255,255,0.1)',
  color: 'var(--text-muted)'
};

export default Home;