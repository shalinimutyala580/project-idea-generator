import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const navItems = [
  { to: '/home', label: 'Home' },
  { to: '/projects', label: 'AI Chemist' },
  { to: '/quiz', label: 'Quests' },
  { to: '/interview', label: 'Interview Questions' },
  { to: '/profile', label: 'Profile' },
];

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setDropdownOpen(false);
      navigate('/signin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path || (path === '/home' && location.pathname === '/');
  };

  return (
    <nav className="navbar-wrapper">
      <Link to="/home" className="nav-logo">
        <span>Dev</span>
        <span className="text-glow-cyan">AIchemy</span>
      </Link>

      {user && (
        <>
          <button className="mobile-hamburger" onClick={() => setMobileOpen((prev) => !prev)}>
            ☰
          </button>
          <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link ${isActive(item.to) ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="profile-pill" onClick={() => setDropdownOpen((prev) => !prev)}>
            {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
          </div>

          {dropdownOpen && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-email">{user.email}</div>
              <button className="signout-button" onClick={handleSignOut}>Sign Out</button>
            </div>
          )}
        </>
      )}
    </nav>
  );
};

export default Navbar;
