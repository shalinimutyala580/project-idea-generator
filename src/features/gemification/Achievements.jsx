import React from 'react';
import { useGamification } from './XPSystem';

const ALL_BADGES = [
  { id: 'first_quiz', icon: '🧠', name: 'Quiz Initiate', desc: 'Completed your first knowledge quiz.' },
  { id: 'project_gen', icon: '🚀', name: 'Alchemist', desc: 'Generated a project roadmap.' },
  { id: 'health_scan', icon: '🩺', name: 'Code Surgeon', desc: 'Analyzed a project for health.' },
  { id: 'sandbox', icon: '🧪', name: 'Mad Scientist', desc: 'Compiled code in the live sandbox.' }
];

const Achievements = () => {
  const { xp, level, unlockedBadges } = useGamification();

  const nextLevelXp = level * 100;
  const progressPercent = ((xp - ((level - 1) * 100)) / 100) * 100;

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(15px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}>
        <span style={{ fontSize: '1.2rem' }}>🏛️</span> Achievement Altar
      </h3>

      {/* Level Progress Bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '8px' }}>
          <span>Level {level} {getLevelTitle(level)}</span>
          <span>{xp} / {nextLevelXp} XP</span>
        </div>
        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', 
            width: `${progressPercent}%`, 
            background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
            transition: 'width 0.5s ease-out'
          }} />
        </div>
      </div>

      {/* Badges Grid */}
      <div>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#94a3b8' }}>Soul-Bound Proofs</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {ALL_BADGES.map(badge => {
            const isUnlocked = unlockedBadges.includes(badge.id);
            return (
              <div key={badge.id} style={{
                width: '45px', height: '45px',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isUnlocked ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isUnlocked ? '#fbbf24' : 'rgba(255,255,255,0.05)'}`,
                opacity: isUnlocked ? 1 : 0.4,
                fontSize: '1.2rem',
                position: 'relative',
                cursor: 'pointer'
              }} title={isUnlocked ? `${badge.name}: ${badge.desc}` : 'Locked Achievement'}>
                {isUnlocked ? badge.icon : '🔒'}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const getLevelTitle = (lvl) => {
  if (lvl < 3) return 'Novice';
  if (lvl < 6) return 'Apprentice';
  if (lvl < 10) return 'Adept';
  if (lvl < 20) return 'Master';
  return 'Grand Alchemist';
}

export default Achievements;
