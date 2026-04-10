import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader";

const IdeaCard = ({ idea, onUpdateGlobalLike }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(idea.likes);
  const [enhancing, setEnhancing] = useState(false);
  const [enhancedData, setEnhancedData] = useState(null);

  useEffect(() => {
    const savedIdeas = JSON.parse(localStorage.getItem("devaichemy_saved_ideas")) || [];
    const existing = savedIdeas.find(i => i.id === idea.id);
    if (existing) {
      setIsSaved(true);
      setUserRating(existing.userRating || 0);
      setIsLiked(existing.isLiked || false);
      if (existing.isLiked) setLikesCount(c => c + 1);
    }
  }, [idea.id]);

  const updateLocalStorage = (updates) => {
    let savedIdeas = JSON.parse(localStorage.getItem("devaichemy_saved_ideas")) || [];
    let existingIndex = savedIdeas.findIndex(i => i.id === idea.id);
    
    if (existingIndex >= 0) {
      savedIdeas[existingIndex] = { ...savedIdeas[existingIndex], ...updates };
    } else {
      savedIdeas.push({ ...idea, ...updates });
    }
    localStorage.setItem("devaichemy_saved_ideas", JSON.stringify(savedIdeas));
  };

  const handleSaveToggle = () => {
    const newSaved = !isSaved;
    setIsSaved(newSaved);
    if (!newSaved) {
      let savedIdeas = JSON.parse(localStorage.getItem("devaichemy_saved_ideas")) || [];
      savedIdeas = savedIdeas.filter(i => i.id !== idea.id);
      localStorage.setItem("devaichemy_saved_ideas", JSON.stringify(savedIdeas));
    } else {
      updateLocalStorage({ isSaved: true });
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikesCount(prev => newLiked ? prev + 1 : prev - 1);
    updateLocalStorage({ isLiked: newLiked });
    if (onUpdateGlobalLike) onUpdateGlobalLike();
  };

  const handleRate = (stars) => {
    setUserRating(stars);
    updateLocalStorage({ userRating: stars, isSaved: true });
    setIsSaved(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Title: ${idea.title}\nDescription: ${idea.shortDescription}\nArchitecture: ${enhancedData?.architecture || idea.architecture}`);
    alert("Copied to clipboard!");
  };

  const handleEnhance = () => {
    setEnhancing(true);
    setTimeout(() => {
      setEnhancedData({
        architecture: idea.architecture + "\n+ Redis Cache\n+ GraphQL Gateway",
        roadmap: idea.roadmap + "\n5. Containerize with Docker.\n6. CI/CD Pipeline setup via GitHub Actions.",
        features: "- User Auth (OAuth 2.0)\n- Real-time Notifications\n- AI Analytics Dashboard",
      });
      setEnhancing(false);
    }, 2000);
  };

  return (
    <>
      <div 
        className="glass-panel glass-premium" 
        onClick={() => setIsModalOpen(true)}
        style={{ padding: '20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '15px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span className="badge-pill" style={{ background: 'rgba(255,255,255,0.05)' }}>{idea.category}</span>
          <span className="badge-pill badge-light">{idea.difficulty}</span>
        </div>
        
        <h3 style={{ margin: '5px 0', fontSize: '1.25rem', color: 'var(--primary-cyan)' }}>{idea.title}</h3>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', flex: 1 }}>{idea.shortDescription}</p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px' }}>
          <div style={{ display: 'flex', gap: '5px', fontSize: '0.9rem', color: '#fbbf24' }}>
            ⭐ {idea.avgRating} <span style={{ color: 'var(--text-muted)' }}>({idea.ratingCount})</span>
          </div>
          <button 
            onClick={handleLike} 
            style={{ background: 'transparent', border: 'none', color: isLiked ? '#ec4899' : 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            {isLiked ? '❤️' : '🤍'} {likesCount}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: 'rgba(5, 11, 20, 0.8)', backdropFilter: 'blur(8px)', zIndex: 1000,
          display: 'grid', placeItems: 'center', padding: '20px'
        }}>
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '0', position: 'relative' }}>
            <button 
              onClick={() => setIsModalOpen(false)} 
              style={{ position: 'absolute', top: '15px', right: '20px', background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer', zIndex: 10 }}
            >
              ✕
            </button>
            
            <div style={{ padding: '30px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <span className="badge-pill" style={{ background: 'rgba(255,255,255,0.05)' }}>{idea.category}</span>
                <span className="badge-pill badge-light">{idea.difficulty}</span>
                <span className="badge-pill" style={{ background: 'rgba(236,72,153,0.1)', color: '#ec4899' }}>Estimate: {idea.timeToComplete}</span>
              </div>
              <h2 style={{ fontSize: '2.2rem', color: 'var(--primary-cyan)', margin: '0 0 10px 0' }}>{idea.title}</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>{idea.shortDescription}</p>
            </div>

            <div style={{ padding: '30px', background: 'rgba(0,0,0,0.2)' }}>
              <h4 style={{ marginBottom: '10px' }}>Architecture & Stack</h4>
              <p style={{ color: 'var(--text-main)', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontFamily: 'monospace' }}>
                {enhancedData ? enhancedData.architecture : idea.architecture}
              </p>

              <h4 style={{ marginTop: '25px', marginBottom: '10px' }}>Implementation Roadmap</h4>
              <div style={{ color: 'var(--text-main)', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                {enhancedData ? enhancedData.roadmap : idea.roadmap}
              </div>

              {enhancedData && (
                 <div className="animate-fade-in" style={{ marginTop: '25px' }}>
                    <h4 style={{ marginBottom: '10px', color: '#ec4899' }}>✨ AI Enhanced Features</h4>
                    <div style={{ color: '#ec4899', padding: '15px', background: 'rgba(236,72,153,0.05)', borderRadius: '8px', whiteSpace: 'pre-wrap', fontFamily: 'monospace', border: '1px solid rgba(236,72,153,0.2)' }}>
                      {enhancedData.features}
                    </div>
                 </div>
              )}

              <div style={{ marginTop: '30px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                {enhancing ? (
                  <div style={{ padding: '12px 24px' }}><Loader text="AI is enhancing..." /></div>
                ) : !enhancedData ? (
                  <button onClick={handleEnhance} style={{ padding: '12px 24px', borderRadius: '8px', background: 'linear-gradient(90deg, #ec4899, #8b5cf6)', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                    ✨ AI Enhance Idea
                  </button>
                ) : null}
                <button onClick={handleCopy} style={btnStyle}>📄 Copy Detail</button>
                <button onClick={handleSaveToggle} style={{ ...btnStyle, borderColor: isSaved ? '#10b981' : 'var(--glass-border)', color: isSaved ? '#10b981' : 'white' }}>
                  {isSaved ? "💾 Bookmarked" : "💾 Bookmark"}
                </button>
                <button onClick={() => alert("PDF Export started...")} style={btnStyle}>📄 Export PDF</button>
                <button onClick={() => alert("Idea Link generated! Copied to clipboard.")} style={btnStyle}>🔗 Share Idea</button>
                <button onClick={() => alert("Booting up Ghost Coder for Brainstorming...")} style={{ ...btnStyle, borderColor: 'var(--primary-cyan)', color: 'var(--primary-cyan)' }}>🤖 Ask Assistant</button>
              </div>
            </div>

            <div style={{ padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.4)', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Rate this idea to improve AI generation:</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1,2,3,4,5].map(star => (
                   <span 
                     key={star} onClick={() => handleRate(star)}
                     style={{ cursor: 'pointer', fontSize: '1.5rem', color: star <= userRating ? '#fbbf24' : 'rgba(255,255,255,0.2)' }}
                   >★</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const btnStyle = {
  padding: '12px 24px', borderRadius: '8px', background: 'transparent',
  border: '1px solid var(--glass-border)', color: 'white', cursor: 'pointer',
  fontWeight: 'bold'
};

export default IdeaCard;
