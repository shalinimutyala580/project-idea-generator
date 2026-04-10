import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/Navbar";

const TECH_SKILLS = [
  "react", "javascript", "typescript", "node", "express", "graphql", "docker", "aws", "python", "java", "sql", "mongodb", "rest", "api", "redux", "next.js", "sass", "tailwind", "css", "html"
];
const SOFT_SKILLS = [
  "communication", "teamwork", "leadership", "collaboration", "problem solving", "adaptability", "creativity", "organization", "critical thinking", "time management", "mentoring", "initiative"
];
const SECTION_KEYWORDS = ["summary", "experience", "skills", "education", "projects", "certifications", "achievements"];

const analyzeResume = (text) => {
  const lower = text.toLowerCase();
  const words = lower.match(/\b\w+\b/g) || [];
  const wordCount = words.length;
  const foundTech = TECH_SKILLS.filter((skill) => lower.includes(skill));
  const foundSoft = SOFT_SKILLS.filter((skill) => lower.includes(skill));
  const foundSections = SECTION_KEYWORDS.filter((section) => lower.includes(section));

  const structureScore = Math.min(35, foundSections.length * 6 + (lower.includes("project") ? 4 : 0) + (lower.includes("certification") ? 4 : 0));
  const keywordScore = Math.min(35, foundTech.length * 5 + foundSoft.length * 3);
  const lengthScore = Math.min(30, Math.max(10, Math.round(wordCount / 25)));
  const score = Math.max(35, Math.min(100, structureScore + keywordScore + lengthScore));

  const strengths = [
    ...foundTech.slice(0, 4),
    ...foundSoft.slice(0, 3),
  ];

  const missingSkills = TECH_SKILLS.filter((skill) => !foundTech.includes(skill)).slice(0, 6);
  const improvements = [];
  if (!lower.includes("summary")) improvements.push("Add a strong professional summary at the top.");
  if (!lower.includes("experience")) improvements.push("Include a clear experience section with results.");
  if (!lower.includes("skills")) improvements.push("Add a dedicated technical skills section.");
  if (!lower.includes("project")) improvements.push("Highlight project achievements with measurable outcomes.");
  if (foundSoft.length < 2) improvements.push("Mention more soft skills such as collaboration and leadership.");
  if (wordCount < 180) improvements.push("Consider expanding your resume with more detail and context.");

  return {
    score,
    wordCount,
    technicalSkills: foundTech,
    softSkills: foundSoft,
    strengths,
    improvements: improvements.slice(0, 5),
    missingSkills,
    sections: foundSections,
    highlightedKeywords: [...new Set([...foundTech.slice(0, 6), ...foundSoft.slice(0, 4)])],
  };
};

const Resume = () => {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("devaichemy_resume_history")) || [];
    setHistory(savedHistory);
  }, []);

  const latestScore = analysis?.score || history[history.length - 1]?.score;

  const handleScan = () => {
    if (!resumeText.trim()) return;
    const result = analyzeResume(resumeText);
    const record = { ...result, date: new Date().toISOString() };
    const updatedHistory = [record, ...history].slice(0, 8);
    setAnalysis(result);
    setHistory(updatedHistory);
    localStorage.setItem("devaichemy_resume_history", JSON.stringify(updatedHistory));
  };

  const recentResume = useMemo(() => history[0], [history]);

  return (
    <div className="app-container">
      <div className="bg-mesh"></div>
      <Navbar />

      <main style={{ padding: '2rem 3rem', maxWidth: '1320px', margin: '0 auto' }} className="animate-fade-in">
        <header style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800 }}>Shadow <span style={{ color: '#ec4899' }}>Recruiter</span></h1>
          <p style={{ color: 'var(--text-muted)' }}>Paste your resume and unlock a recruiter-style review with score, skills, strengths and improvement guidance.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.9fr', gap: '2rem', marginBottom: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here..."
              style={{
                width: '100%', minHeight: '260px', borderRadius: '18px', background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--glass-border)', padding: '20px', color: 'white', fontFamily: 'Inter, sans-serif',
                fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box'
              }}
            />
            <button onClick={handleScan} className="btn-premium" style={{ marginTop: '20px', width: '100%', fontSize: '1rem' }}>
              Initiate Scan
            </button>
          </div>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h2 style={{ marginTop: 0 }}>Resume Score</h2>
              <p style={{ color: 'var(--text-muted)' }}>A recruiter-grade score built from structure, keyword relevance and role fit.</p>
              <div className="progress-shell" style={{ marginTop: '1.5rem' }}>
                <div className="progress-bar" style={{ width: `${latestScore || 12}%`, background: 'linear-gradient(90deg, #ec4899, #a855f7)' }}></div>
              </div>
              <span style={{ display: 'block', marginTop: '1rem', fontSize: '1.3rem', fontWeight: 700 }}>{latestScore || 0}/100</span>
            </div>

            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h2 style={{ marginTop: 0 }}>Resume History</h2>
              {history.length ? (
                history.slice(0, 3).map((entry, index) => (
                  <div key={entry.date} className="history-entry">
                    <div>
                      <strong>{new Date(entry.date).toLocaleDateString()}</strong>
                      <p style={{ margin: '0.35rem 0 0 0', color: 'var(--text-muted)' }}>Score {entry.score}/100</p>
                    </div>
                    <span className="status-pill">Saved</span>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)' }}>No scans have been completed yet.</p>
              )}
            </div>
          </div>
        </div>

        {analysis && (
          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2rem' }}>
              <div>
                <h2 style={{ marginTop: 0 }}>Intelligent Review</h2>
                <p style={{ color: 'var(--text-muted)' }}>The Shadow Recruiter analyzes your resume with keyword and structure heuristics.</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                  <div className="stat-card"><strong>{analysis.technicalSkills.length}</strong><span>Technical skills found</span></div>
                  <div className="stat-card"><strong>{analysis.softSkills.length}</strong><span>Soft skills found</span></div>
                  <div className="stat-card"><strong>{analysis.sections.length}</strong><span>Sections detected</span></div>
                </div>
              </div>

              <div>
                <h3 style={{ marginTop: 0 }}>Key Skills</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.85rem' }}>
                  {analysis.highlightedKeywords.map((keyword) => (
                    <span key={keyword} className="badge-pill">{keyword}</span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', marginTop: '2rem' }}>
              <div>
                <h3>Strengths</h3>
                <ul style={{ marginTop: '1rem', color: 'var(--text-muted)', paddingLeft: '1.25rem' }}>
                  {analysis.strengths.map((strength) => (
                    <li key={strength}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Areas for Improvement</h3>
                <ul style={{ marginTop: '1rem', color: 'var(--text-muted)', paddingLeft: '1.25rem' }}>
                  {analysis.improvements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ marginTop: 0 }}>Resume Keyword Breakdown</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem' }}>Important terms detected by the analyzer are surfaced here so you can strengthen your resume with confidence.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginTop: '1.25rem' }}>
            {(analysis?.highlightedKeywords || []).map((keyword) => (
              <span key={keyword} className="badge-pill badge-light">{keyword}</span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resume;
