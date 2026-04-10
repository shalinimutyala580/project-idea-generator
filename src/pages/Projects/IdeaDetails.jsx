import React, { useState, useEffect } from "react";

const IdeaDetails = ({ idea }) => {
  const [saved, setSaved] = useState(false);
  const [rating, setRating] = useState(0); // 0 to 5
  
  // Load initial states from local storage if previously saved
  useEffect(() => {
    const savedIdeas = JSON.parse(localStorage.getItem("savedIdeas")) || [];
    const existing = savedIdeas.find(i => i.id === idea.id);
    if (existing) {
      setSaved(true);
      setRating(existing.rating || 0);
    }
  }, [idea.id]);

  const handleCopy = () => {
    const text = `Title: ${idea.title}\nArchitecture: ${idea.architecture}\nRoadmap:\n${idea.roadmap}`;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleSave = () => {
    let savedIdeas = JSON.parse(localStorage.getItem("savedIdeas")) || [];
    if (!saved) {
      savedIdeas.push({ ...idea, rating });
      setSaved(true);
      alert("Idea saved to your lab!");
    } else {
      savedIdeas = savedIdeas.filter(i => i.id !== idea.id);
      setSaved(false);
    }
    localStorage.setItem("savedIdeas", JSON.stringify(savedIdeas));
  };

  const handleRate = (stars) => {
    setRating(stars);
    // Update local storage if already saved
    if (saved) {
      let savedIdeas = JSON.parse(localStorage.getItem("savedIdeas")) || [];
      savedIdeas = savedIdeas.map(i => i.id === idea.id ? { ...i, rating: stars } : i);
      localStorage.setItem("savedIdeas", JSON.stringify(savedIdeas));
    }
  };

  return (
    <div className={`glass-panel animate-fade-in ${idea.isBestMatch ? "glass-premium pulse-glow" : ""}`} style={{ padding: '30px', marginBottom: '20px', borderLeft: idea.isBestMatch ? '4px solid #ec4899' : '4px solid var(--primary-cyan)', position: 'relative' }}>
      {idea.isBestMatch && (
        <span style={{ position: 'absolute', top: '-15px', right: '30px', background: 'linear-gradient(90deg, #ec4899, #8b5cf6)', padding: '5px 15px', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.85rem', boxShadow: '0 4px 10px rgba(236, 72, 153, 0.4)' }}>
          🔥 Best Match
        </span>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: '1.5rem', color: idea.isBestMatch ? '#ec4899' : 'var(--primary-cyan)', margin: '0 0 10px 0' }}>{idea.title}</h3>
        <div style={{ display: 'flex', gap: '5px' }}>
          {[1, 2, 3, 4, 5].map(star => (
            <span 
              key={star} 
              onClick={() => handleRate(star)}
              style={{ cursor: 'pointer', color: star <= rating ? '#fbbf24' : '#4b5563', fontSize: '1.2rem' }}>
              ★
            </span>
          ))}
        </div>
      </div>
      
      <p style={{ color: 'var(--text-muted)', marginBottom: '15px' }}><strong>Architecture:</strong> {idea.architecture}</p>
      
      <div style={{ 
        background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '8px', 
        whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: '#e2e8f0'
      }}>
        {idea.roadmap}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
        <button onClick={handleCopy} style={actionBtnStyle}>📄 Copy</button>
        <button onClick={handleSave} style={{ ...actionBtnStyle, color: saved ? '#10b981' : 'white', borderColor: saved ? '#10b981' : 'var(--glass-border)' }}>
          {saved ? "💾 Saved" : "💾 Save Idea"}
        </button>
      </div>
    </div>
  );
};

const actionBtnStyle = {
  padding: '8px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)',
  border: '1px solid var(--glass-border)', color: 'white', cursor: 'pointer',
  transition: 'all 0.2s'
};

export default IdeaDetails;
