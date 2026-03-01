import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, XCircle, Users, TrendingUp } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { adminApi } from '../utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await adminApi.getStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
      });
    } catch { return dateStr; }
  };

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="loading-center">
          <div className="spinner" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="stats-grid">
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className="stat-card-header">
            <span className="stat-card-label">Total Events</span>
            <div className="stat-card-icon blue">
              <Calendar size={20} />
            </div>
          </div>
          <div className="stat-card-value">{stats?.totalEvents || 0}</div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-card-header">
            <span className="stat-card-label">Published</span>
            <div className="stat-card-icon green">
              <CheckCircle size={20} />
            </div>
          </div>
          <div className="stat-card-value">{stats?.publishedEvents || 0}</div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="stat-card-header">
            <span className="stat-card-label">Unpublished</span>
            <div className="stat-card-icon yellow">
              <XCircle size={20} />
            </div>
          </div>
          <div className="stat-card-value">{stats?.unpublishedEvents || 0}</div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-card-header">
            <span className="stat-card-label">Total Registrations</span>
            <div className="stat-card-icon red">
              <Users size={20} />
            </div>
          </div>
          <div className="stat-card-value">{stats?.totalRegistrations || 0}</div>
        </motion.div>
      </div>

      {/* Recent Registrations */}
      <motion.div
        className="table-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <div className="table-header">
          <h3>
            <TrendingUp size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
            Recent Registrations
          </h3>
        </div>

        {stats?.recentRegistrations?.length > 0 ? (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Event</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentRegistrations.map((reg, i) => (
                  <tr key={reg.id || i}>
                    <td style={{ fontWeight: 600 }}>{reg.full_name}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{reg.email}</td>
                    <td>{reg.event_title}</td>
                    <td style={{ color: 'var(--text-tertiary)', fontSize: '0.82rem' }}>
                      {formatDate(reg.joined_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state" style={{ padding: '40px' }}>
            <p>No registrations yet</p>
          </div>
        )}
      </motion.div>
    </AdminLayout>
  );
}
