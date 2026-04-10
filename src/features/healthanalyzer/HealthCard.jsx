import React, { useState } from 'react';
import { analyzeProject } from './healthLogic';
import { useGamification } from '../gemification/XPSystem';

const HealthCard = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  
  const { addXP, unlockBadge } = useGamification();

  const handleScan = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const scanData = await analyzeProject(url);
      setResult(scanData);
      
      // Award XP for scanning projects
      addXP(50, 'Scanned a repository for code health');
      unlockBadge('health_scan');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      gridColumn: '1 / -1',
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(15px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}>
          <span style={{ fontSize: '1.2rem' }}>🩺</span> Project Health Analyzer
        </h3>
        <span style={{ fontSize: '0.75rem', background: 'rgba(0, 242, 254, 0.1)', color: '#00f2fe', padding: '4px 8px', borderRadius: '12px', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
          Utility
        </span>
      </div>
      
      <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
        Paste a public repository URL to simulate deep static analysis of code quality, architecture, and performance.
      </p>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://github.com/your-username/repo"
          style={{
            flex: 1, padding: '12px',
            background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px', color: 'white', outline: 'none'
          }}
        />
        <button 
          onClick={handleScan}
          disabled={loading || !url}
          style={{
            padding: '12px 20px',
            background: 'linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)',
            border: 'none', borderRadius: '12px',
            color: 'white', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer',
            opacity: (!url || loading) ? 0.7 : 1
          }}
        >
          {loading ? 'Scanning...' : 'Analyze'}
        </button>
      </div>

      {error && <div style={{ color: '#ef4444', fontSize: '0.85rem', padding: '8px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>{error}</div>}

      {result && (
        <div style={{ marginTop: '10px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', animation: 'fadeIn 0.5s ease-out' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Maintainability</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: result.maintainability.includes('A') ? '#10b981' : '#f59e0b' }}>
                {result.maintainability}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Performance</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: result.performanceScore >= 85 ? '#10b981' : '#f59e0b' }}>
                {result.performanceScore} / 100
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Vulnerabilities</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: result.securityVulnerabilities === 0 ? '#10b981' : '#ef4444' }}>
                {result.securityVulnerabilities} Detected
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Complexity Avg</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#4facfe' }}>
                {result.cyclomaticComplexity}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '15px', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '15px' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '8px' }}>AI Recommendations:</div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: 'white' }}>
              {result.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthCard;
