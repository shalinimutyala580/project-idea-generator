import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, description, icon, tag, color = "var(--primary-cyan)", route, children, span = 1 }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <div 
      className="glass-panel"
      onClick={handleNavigate}
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        cursor: route ? 'pointer' : 'default',
        gridColumn: `span ${span}`,
        minHeight: '200px',
        transition: 'transform 0.3s ease, border-color 0.3s ease, background 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        if(route) {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.borderColor = color;
            e.currentTarget.style.background = 'var(--glass-hover-bg)';
        }
      }}
      onMouseLeave={(e) => {
        if(route) {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--glass-border)';
            e.currentTarget.style.background = 'var(--glass-bg)';
        }
      }}
    >
      <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '4px',
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity: 0.5
      }} />

      {tag && (
        <span style={{
          alignSelf: 'flex-start',
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          padding: '4px 8px',
          borderRadius: '4px',
          border: `1px solid ${color}`,
          color: color,
          fontWeight: 'bold',
          marginBottom: '8px'
        }}>
          {tag}
        </span>
      )}
      
      <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '1.5rem' }}>{icon}</span> {title}
      </h3>
      
      {description && <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{description}</p>}
      
      <div style={{ flex: 1, marginTop: '12px' }}>
        {children}
      </div>

    </div>
  );
};

export default Card;
