import React from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Profile = () => {
  const { user } = useAuth();
  const profileName = user?.displayName || user?.email?.split("@")[0] || "DevAIchemist";

  const metrics = [
    { label: "Lines of Code Deleted", value: "84,392", icon: "🔥", color: "#ec4899" },
    { label: "Bugs Re-introduced", value: "42", icon: "🐛", color: "#eab308" },
    { label: "AI Suggestions Ignored", value: "1,337", icon: "🤖", color: "#00f2fe" },
    { label: "Late Night Commits", value: "128", icon: "🌙", color: "#a855f7" },
  ];

  const arsenal = [
    "Vim Wizardry", "React Architecture", "Python Automation", 
    "Prompt Engineering", "System Design", "CSS Black Magic"
  ];

  return (
    <div className="app-container">
      <div className="bg-mesh"></div>
      <Navbar />

      <main style={{ padding: "3rem", maxWidth: "1200px", margin: "0 auto" }} className="animate-fade-in">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2.5fr", gap: "2.5rem", alignItems: "start" }}>
          
          {/* Left Column: Identity Card */}
          <aside className="glass-panel glass-premium" style={{ padding: "2.5rem 2rem", textAlign: "center" }}>
            <div 
              style={{
                width: "120px", height: "120px", borderRadius: "50%", margin: "0 auto 1.5rem",
                background: "linear-gradient(135deg, var(--primary-cyan), var(--accent-violet))",
                display: "grid", placeItems: "center", fontSize: "3rem", color: "#050b14", fontWeight: 900,
                boxShadow: "0 10px 25px rgba(139, 92, 246, 0.4)"
              }}
            >
              {profileName.charAt(0).toUpperCase()}
            </div>
            
            <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "1.8rem" }}>{profileName}</h2>
            <div style={{ color: "var(--primary-cyan)", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
              Nexus Architect
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem" }}>
              <div>
                <span style={{ display: "block", color: "var(--text-muted)", fontSize: "0.85rem" }}>Rank</span>
                <strong>Grandmaster</strong>
              </div>
              <div>
                <span style={{ display: "block", color: "var(--text-muted)", fontSize: "0.85rem" }}>Level</span>
                <strong>42</strong>
              </div>
            </div>
          </aside>

          {/* Right Column: Unique Data */}
          <section>
            
            <div className="glass-panel glass-premium" style={{ padding: "2.5rem", marginBottom: "2rem" }}>
              <h3 style={{ margin: "0 0 1.5rem 0", fontSize: "1.5rem" }}>Developer Arsenal</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {arsenal.map(skill => (
                  <div key={skill} style={{ 
                    padding: "0.75rem 1.25rem", background: "rgba(255,255,255,0.05)", 
                    border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px",
                    fontWeight: 600, letterSpacing: "0.5px"
                  }}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            <h3 style={{ margin: "0 0 1.5rem 0", fontSize: "1.5rem" }}>Vitals & Quirks</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
              {metrics.map((metric, i) => (
                <div key={i} className="glass-panel glass-premium profile-card" style={{ padding: "1.5rem", borderLeft: `4px solid ${metric.color}` }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>{metric.label}</span>
                    <span style={{ fontSize: "1.5rem" }}>{metric.icon}</span>
                  </div>
                  <strong style={{ display: "block", marginTop: "1rem", fontSize: "2rem", color: "var(--text-main)" }}>
                    {metric.value}
                  </strong>
                </div>
              ))}
            </div>

            <div className="glass-panel glass-premium" style={{ padding: "2.5rem", marginTop: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1.2rem", color: "var(--primary-cyan)" }}>Currently Seeking</h4>
                <p style={{ margin: 0, color: "var(--text-muted)" }}>A dark theme so dark it absorbs real-world light.</p>
              </div>
              <div style={{ fontSize: "2.5rem" }}>😎</div>
            </div>
          </section>
          
        </div>
      </main>
    </div>
  );
};

export default Profile;
