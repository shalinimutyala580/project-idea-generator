import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";
import { generateIdea } from "../../data/ideas";
import IdeaCard from "./IdeaCard";

const Projects = () => {
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState([]);
  
  // Filters
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Likes");

  // Dashboard Metrics
  const [savedIdeasCount, setSavedIdeasCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const saved = JSON.parse(localStorage.getItem("devaichemy_saved_ideas")) || [];
      setSavedIdeasCount(saved.length);
    };
    updateCount();
    // In a real app we'd use better context, but here we can poll or just update after actions.
  }, [ideas]);

  const handleGenerate = () => {
    if (!skills) return alert("Please enter some skills to forge an idea!");
    setLoading(true);
    setTimeout(() => {
      const ideaData = generateIdea(skills);
      setIdeas(ideaData);
      setLoading(false);
    }, 1500); 
  };

  // Filter & Sort Logic
  const filteredIdeas = ideas.filter(idea => {
    if (search && !idea.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (categoryFilter !== "All" && idea.category !== categoryFilter) return false;
    if (difficultyFilter !== "All" && idea.difficulty !== difficultyFilter) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "Likes") return b.likes - a.likes;
    if (sortBy === "Rating") return b.avgRating - a.avgRating;
    return 0;
  });

  return (
    <div className="app-container">
      <div className="bg-mesh"></div>
      <Navbar />

      <main style={{ padding: '2rem 3rem', maxWidth: '1300px', margin: '0 auto' }} className="animate-fade-in">
        
        {/* Performance Dashboard & Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.8rem', color: 'white', margin: '0 0 10px 0' }}>AI Chemist Lab</h1>
            <p style={{ color: 'var(--text-muted)', margin: 0, maxWidth: '500px' }}>
              Your professional idea-generation platform. Discover, evaluate, and refine cutting-edge tech projects and startup concepts manually or directly using advanced AI.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div className="glass-panel" style={{ padding: '15px 25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#ec4899' }}>{savedIdeasCount}</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Saved Blueprints</span>
            </div>
            <div className="glass-panel" style={{ padding: '15px 25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#10b981' }}>{ideas.length}</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Active Session Ideas</span>
            </div>
          </div>
        </header>

        {/* Coffee Break / AI Motivational Banner */}
        <div className="glass-panel pulse-glow" style={{ padding: '20px', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px', borderLeft: '4px solid #f59e0b' }}>
          <span style={{ fontSize: '2rem' }}>☕</span>
          <div>
            <strong style={{ display: 'block', marginBottom: '5px' }}>Coffee Break Tip: "Current Trend"</strong>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>AI Agent tools are heavily requested right now. Try combining your framework with "Local LLMs" or "Vision APIs" for maximum traction.</span>
          </div>
        </div>

        {/* Input Region */}
        <section className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Enter a skill (e.g. React, Node, Web3, Python...)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            style={{ flex: '1 1 300px', padding: '16px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '1rem' }}
          />
          <button onClick={handleGenerate} style={{ padding: '16px 32px', borderRadius: '12px', background: 'linear-gradient(90deg, var(--primary-cyan), var(--primary-blue))', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>
            Generate Ideas
          </button>
          <button onClick={() => window.location.href='/saved-ideas'} style={{ padding: '16px 20px', borderRadius: '12px', background: 'transparent', border: '1px solid var(--glass-border)', color: 'white', cursor: 'pointer' }}>
            View Saved
          </button>
        </section>

        {loading ? (
          <div style={{ padding: '50px 0' }}><Loader text="Analyzing current trends, tech stacks, and problem spaces..." /></div>
        ) : ideas.length > 0 ? (
          <>
            {/* Smart Filtering Bar */}
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <input type="text" placeholder="🔍 Search generated..." value={search} onChange={e => setSearch(e.target.value)} style={filterInputStyle} />
              
              <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={filterInputStyle}>
                <option value="All">All Categories</option>
                <option value="Project">Projects</option>
                <option value="Startup">Startups</option>
                <option value="Freelancing">Freelancing</option>
                <option value="Content Creation">Content Creation</option>
              </select>

              <select value={difficultyFilter} onChange={e => setDifficultyFilter(e.target.value)} style={filterInputStyle}>
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={filterInputStyle}>
                <option value="Likes">Most Liked</option>
                <option value="Rating">Highest Rated</option>
              </select>
            </div>

            {/* Ideas Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {filteredIdeas.length > 0 ? filteredIdeas.map(idea => (
                <IdeaCard 
                  key={idea.id} 
                  idea={idea} 
                  onUpdateGlobalLike={() => { /* Handled locally by reload but forced re-render could go here */ }} 
                />
              )) : (
                <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No ideas match your filters.</div>
              )}
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '20px' }}>
            No active session. Enter a skill above to forge new real-world applications, startup ideas, and freelance gigs.
          </div>
        )}
      </main>
    </div>
  );
};

const filterInputStyle = {
  background: 'rgba(0,0,0,0.4)', borderRadius: '8px', padding: '10px 15px', 
  border: '1px solid rgba(255,255,255,0.1)', color: 'white', flex: '1 1 200px'
};

export default Projects;
