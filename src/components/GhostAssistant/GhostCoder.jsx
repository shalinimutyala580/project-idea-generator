import React, { useState, useEffect, useRef } from 'react';
import { useGamification } from '../../features/gemification/XPSystem';

const GHOST_RESPONSES = [
  "Looks solid! Don't forget to memoize that expensive component though.",
  "Warning: Potential memory leak detected if you don't clean up that useEffect.",
  "Consider extracting this monolithic structure into smaller reusable atoms.",
  "I'm sensing some high cyclomatic complexity here. Care to refactor?",
  "Great job on handling those edge cases! +1 for robustness."
];

const GhostCoder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hey! I'm Ghost Coder, your simulated AI Pair Programmer. Need a second set of eyes?", sender: 'ghost' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const { addXP } = useGamification();

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responseText = GHOST_RESPONSES[Math.floor(Math.random() * GHOST_RESPONSES.length)];
      setMessages(prev => [...prev, { text: responseText, sender: 'ghost' }]);
      setIsTyping(false);
      
      // Reward interaction occasionally
      if (Math.random() > 0.5) {
        addXP(10, "Brainstormed with Ghost Coder");
      }
    }, 1500);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #8b5cf6, #c084fc)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.8rem',
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(139, 92, 246, 0.5)',
          zIndex: 1000,
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'scale(0.8)' : 'scale(1)'
        }}
      >
        👻
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '30px',
          width: '350px',
          height: '450px',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '20px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 999,
          overflow: 'hidden',
          animation: 'ghostFadeIn 0.3s ease-out'
        }}>
          {/* Header */}
          <div style={{
            padding: '15px 20px',
            background: 'rgba(139, 92, 246, 0.2)',
            borderBottom: '1px solid rgba(139, 92, 246, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '1.5rem' }}>👻</span>
            <div>
              <h4 style={{ margin: 0, color: 'white', fontSize: '1rem' }}>Ghost Coder</h4>
              <span style={{ fontSize: '0.75rem', color: '#c084fc' }}>Active Session</span>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                background: msg.sender === 'user' ? 'linear-gradient(135deg, #00f2fe, #4facfe)' : 'rgba(255,255,255,0.05)',
                border: msg.sender === 'ghost' ? '1px solid rgba(139, 92, 246, 0.3)' : 'none',
                padding: '10px 15px',
                borderRadius: '16px',
                borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: msg.sender === 'ghost' ? '4px' : '16px',
                color: 'white',
                fontSize: '0.9rem',
                lineHeight: '1.4'
              }}>
                {msg.text}
              </div>
            ))}
            
            {isTyping && (
              <div style={{
                alignSelf: 'flex-start',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                padding: '10px 15px',
                borderRadius: '16px',
                borderBottomLeftRadius: '4px',
                color: '#c084fc',
                fontSize: '0.8rem',
                fontStyle: 'italic'
              }}>
                Ghost is inspecting your logic...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{
            padding: '15px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            gap: '10px'
          }}>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for refactoring advice..."
              style={{
                flex: 1,
                padding: '10px 15px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '20px',
                color: 'white',
                outline: 'none'
              }}
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              style={{
                background: 'rgba(139, 92, 246, 0.2)',
                border: '1px solid rgba(139, 92, 246, 0.5)',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: (!input.trim() || isTyping) ? 0.5 : 1
              }}
            >
              ➤
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes ghostFadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
};

export default GhostCoder;
