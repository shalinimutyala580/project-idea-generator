import React, { createContext, useContext, useState, useEffect } from 'react';

const GamificationContext = createContext();

export const useGamification = () => useContext(GamificationContext);

export const GamificationProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [unlockedBadges, setUnlockedBadges] = useState([]);
  const [showNotification, setShowNotification] = useState(null);

  // Load from local storage
  useEffect(() => {
    const savedXp = localStorage.getItem('devaichemy_xp');
    const savedLevel = localStorage.getItem('devaichemy_level');
    const savedBadges = localStorage.getItem('devaichemy_badges');

    if (savedXp) setXp(parseInt(savedXp));
    if (savedLevel) setLevel(parseInt(savedLevel));
    if (savedBadges) setUnlockedBadges(JSON.parse(savedBadges));
  }, []);

  // Save to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('devaichemy_xp', xp);
    localStorage.setItem('devaichemy_level', level);
    localStorage.setItem('devaichemy_badges', JSON.stringify(unlockedBadges));
  }, [xp, level, unlockedBadges]);

  const addXP = (amount, reason) => {
    const newXp = xp + amount;
    setXp(newXp);
    
    // Level up logic (100 XP per level increment)
    const newLevel = Math.floor(newXp / 100) + 1;
    let didLevelUp = false;
    
    if (newLevel > level) {
      setLevel(newLevel);
      didLevelUp = true;
    }

    triggerNotification(amount, reason, didLevelUp ? newLevel : null);
  };

  const unlockBadge = (badgeName) => {
    if (!unlockedBadges.includes(badgeName)) {
      setUnlockedBadges(prev => [...prev, badgeName]);
      triggerNotification(0, `Unlocked Badge: ${badgeName}!`, null);
    }
  };

  const triggerNotification = (xpGained, reason, leveledUpTo) => {
    setShowNotification({ xpGained, reason, leveledUpTo });
    setTimeout(() => setShowNotification(null), 4000);
  };

  return (
    <GamificationContext.Provider value={{ xp, level, unlockedBadges, addXP, unlockBadge }}>
      {children}
      
      {/* Global Gamification Notification Overlay */}
      {showNotification && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: showNotification.leveledUpTo ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${showNotification.leveledUpTo ? '#fcd34d' : 'rgba(0, 242, 254, 0.3)'}`,
          padding: '16px 24px',
          borderRadius: '16px',
          color: showNotification.leveledUpTo ? '#000' : '#fff',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          animation: 'slideUpGamification 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          fontWeight: 'bold'
        }}>
          <div style={{ fontSize: '1.5rem' }}>
            {showNotification.leveledUpTo ? '🏆' : '✨'}
          </div>
          <div>
            {showNotification.leveledUpTo ? (
              <div style={{ fontSize: '1.1rem' }}>Leveled up to <strong>Level {showNotification.leveledUpTo}</strong>!</div>
            ) : (
              <div>
                <span style={{ color: '#00f2fe' }}>+{showNotification.xpGained} XP</span> - {showNotification.reason}
              </div>
            )}
          </div>
          <style>{`
            @keyframes slideUpGamification {
              0% { opacity: 0; transform: translate(-50%, 20px); }
              100% { opacity: 1; transform: translate(-50%, 0); }
            }
          `}</style>
        </div>
      )}
    </GamificationContext.Provider>
  );
};
