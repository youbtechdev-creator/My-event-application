import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Calendar, Shield } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-inner">
        <div
          className="navbar-brand"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
          id="navbar-brand-link"
        >
          <div className="brand-icon">
            <Calendar size={18} />
          </div>
          <span>EventHub</span>
        </div>

        <div className="navbar-actions">
          <button
            className="nav-link-btn"
            onClick={() => navigate('/')}
            id="nav-home-btn"
            style={location.pathname === '/' ? { color: 'var(--primary)', background: 'var(--primary-light)' } : {}}
          >
            Events
          </button>
          <button
            className="nav-link-btn"
            onClick={() => navigate('/admin/login')}
            id="nav-admin-btn"
          >
            <Shield size={15} />
            Admin
          </button>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            id="theme-toggle-btn"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
