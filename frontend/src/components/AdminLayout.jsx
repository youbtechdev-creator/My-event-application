import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  Calendar, LayoutDashboard, PlusCircle, List, Users,
  LogOut, Sun, Moon, Menu, X
} from 'lucide-react';

export default function AdminLayout({ children, title }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const adminEmail = localStorage.getItem('admin-email') || 'admin';

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-email');
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/add-event', label: 'Add Event', icon: PlusCircle },
    { path: '/admin/manage-events', label: 'Manage Events', icon: List },
    { path: '/admin/participants', label: 'Participants', icon: Users },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="admin-layout">
      {/* Sidebar Overlay (Mobile) */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`} id="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-brand">
            <div className="brand-icon">
              <Calendar size={16} />
            </div>
            <span>EventHub</span>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.path}
              className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              id={`sidebar-${item.label.toLowerCase().replace(/\s/g, '-')}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <button
            className="sidebar-link"
            onClick={handleLogout}
            id="sidebar-logout"
            style={{ color: 'var(--danger)' }}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-content">
        {/* Top Bar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              id="menu-toggle-btn"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h2>{title}</h2>
          </div>

          <div className="admin-topbar-right">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              id="admin-theme-toggle"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <div className="admin-profile-badge">
              <div className="admin-profile-avatar">
                {adminEmail.charAt(0).toUpperCase()}
              </div>
              <span className="admin-profile-name">{adminEmail.split('@')[0]}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="admin-page-content">
          {children}
        </div>
      </div>
    </div>
  );
}
