import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { useGamification } from '../../features/gemification/XPSystem';

const CodeSandbox = () => {
  const [html, setHtml] = useState('<div class="hero">\n  <h1>Transmute Code</h1>\n  <p>Start typing to see magic.</p>\n</div>');
  const [css, setCss] = useState('.hero {\n  color: #00f2fe;\n  font-family: sans-serif;\n  text-align: center;\n  padding: 2rem;\n  background: #0f172a;\n  border-radius: 12px;\n}');
  const [js, setJs] = useState('console.log("Alchemy initialized.");');
  const [srcDoc, setSrcDoc] = useState('');

  const { addXP, unlockBadge } = useGamification();

  // Debounce the iframe compilation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `);
      // Reward interaction occasionally to make the sandbox gamified
      if (Math.random() > 0.8) {
        addXP(5, 'Experimented in Sandbox');
        unlockBadge('sandbox');
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css, js, addXP, unlockBadge]);

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <div className="bg-mesh"></div>
      <Navbar />

      <main style={{ flex: 1, padding: '20px', display: 'flex', gap: '20px', overflow: 'hidden', zIndex: 1 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={labelStyle}>HTML</div>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              style={editorStyle}
              spellCheck="false"
            />
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={labelStyle}>CSS</div>
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              style={editorStyle}
              spellCheck="false"
            />
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={labelStyle}>JavaScript</div>
            <textarea
              value={js}
              onChange={(e) => setJs(e.target.value)}
              style={editorStyle}
              spellCheck="false"
            />
          </div>

        </div>

        {/* Live Output Iframe */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '24px', border: '1px solid rgba(0, 242, 254, 0.2)', overflow: 'hidden', backdropFilter: 'blur(10px)' }}>
          <div style={{ padding: '10px 20px', background: 'rgba(0,0,0,0.4)', color: 'white', fontWeight: 'bold', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>Live Output</span>
            <span style={{ fontSize: '0.75rem', color: '#10b981' }}>● Compiled</span>
          </div>
          <iframe 
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            style={{ width: '100%', height: '100%', border: 'none', background: 'white' }}
          />
        </div>
      </main>
    </div>
  );
};

const labelStyle = {
  background: 'rgba(0, 242, 254, 0.1)',
  color: '#00f2fe',
  padding: '6px 12px',
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  border: '1px solid rgba(0, 242, 254, 0.2)',
  borderBottom: 'none',
  width: 'max-content'
};

const editorStyle = {
  flex: 1,
  background: 'rgba(15, 23, 42, 0.8)',
  color: '#e2e8f0',
  fontFamily: 'monospace',
  fontSize: '0.95rem',
  padding: '15px',
  border: '1px solid rgba(0, 242, 254, 0.2)',
  borderBottomLeftRadius: '12px',
  borderBottomRightRadius: '12px',
  borderTopRightRadius: '12px',
  outline: 'none',
  resize: 'none'
};

export default CodeSandbox;
