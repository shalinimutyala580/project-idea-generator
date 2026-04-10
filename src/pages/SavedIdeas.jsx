import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import IdeaCard from "./Projects/IdeaCard";

const SavedIdeas = () => {
  const [savedIdeas, setSavedIdeas] = useState([]);
  
  // Dashboard Metrics
  const [totalLikesGiven, setTotalLikesGiven] = useState(0);

  useEffect(() => {
    const fetchIdeas = () => {
      const ideas = JSON.parse(localStorage.getItem("devaichemy_saved_ideas")) || [];
      // Assuming ideas that have isSaved = true are meant to be shown, though the user might also have ratings/likes from other ideas
      const purelySaved = ideas.filter(i => i.isSaved);
      setSavedIdeas(purelySaved);

      // Calc likes given overall for metrics
      const likes = ideas.filter(i => i.isLiked).length;
      setTotalLikesGiven(likes);
    };

    fetchIdeas();
    window.addEventListener("storage", fetchIdeas);
    return () => window.removeEventListener("storage", fetchIdeas);
  }, []);

  return (
    <div className="app-container">
      <div className="bg-mesh"></div>
      <Navbar />

      <main style={{ padding: '2rem 3rem', maxWidth: '1300px', margin: '0 auto' }} className="animate-fade-in">
        
        <header style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2.8rem', color: 'var(--primary-purple)', margin: '0 0 10px 0' }}>Your Saved Arsenal</h1>
            <p style={{ color: 'var(--text-muted)', margin: 0, maxWidth: '500px' }}>
              Your personally curated list of top-tier generated algorithms, startup visions, and freelance jobs.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div className="glass-panel" style={{ padding: '15px 25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#10b981' }}>{savedIdeas.length}</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Bookmarks</span>
            </div>
            <div className="glass-panel" style={{ padding: '15px 25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#ec4899' }}>{totalLikesGiven}</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ideas Liked</span>
            </div>
            <div className="glass-panel" style={{ padding: '15px 25px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => window.location.href='/projects'}>
              <h3 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--primary-cyan)' }}>+</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Forge More</span>
            </div>
          </div>
        </header>

        {savedIdeas.length === 0 ? (
          <div className="glass-panel" style={{ padding: '80px 20px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '15px' }}>📭</span>
            No ideas saved yet. Launch the AI Chemist Lab to transmute some!
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {savedIdeas.map(idea => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedIdeas;
