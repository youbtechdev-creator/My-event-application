import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Mail, Lock, AlertCircle } from 'lucide-react';
import { adminApi } from '../utils/api';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const data = await adminApi.login(email, password);
      localStorage.setItem('admin-token', data.token);
      localStorage.setItem('admin-email', data.admin.email);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Theme Toggle - Floating */}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 10 }}
        id="login-theme-toggle"
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </button>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', damping: 20 }}
      >
        <div className="login-card-header">
          <div className="brand-icon">
            <Calendar size={24} />
          </div>
          <h1>Admin Login</h1>
          <p>Sign in to manage your events</p>
        </div>

        {error && (
          <motion.div
            className="login-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">
              <Mail size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              Email Address
            </label>
            <input
              type="email"
              id="admin-email"
              className="form-input"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">
              <Lock size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              Password
            </label>
            <input
              type="password"
              id="admin-password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginTop: '8px' }}
            disabled={loading}
            id="admin-login-btn"
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }} />
                Signing in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate('/')}
            id="back-to-home-btn"
          >
            ← Back to Events
          </button>
        </div>
      </motion.div>
    </div>
  );
}
