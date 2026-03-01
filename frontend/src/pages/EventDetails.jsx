import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, Users, UserCheck, Mail, User } from 'lucide-react';
import { eventApi } from '../utils/api';
import { useToast } from '../context/ToastContext';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';

const categoryIcons = {
  'Technology': '💻', 'Business': '💼', 'Music': '🎵', 'Sports': '⚽',
  'Education': '📚', 'Health': '🏥', 'Art': '🎨', 'Food': '🍕',
  'Social': '🎉', 'Other': '📌',
};

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ full_name: '', email: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  if (!id) {
    return null;
  }

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const data = await eventApi.getEvent(id);
      setEvent(data);
    } catch (err) {
      addToast('Event not found', 'error');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.full_name.trim() || formData.full_name.trim().length < 2) {
      errs.full_name = 'Full name must be at least 2 characters';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      await eventApi.joinEvent(id, formData);
      addToast('Successfully joined the event!', 'success');
      setShowSuccess(true);
      setFormData({ full_name: '', email: '' });
      fetchEvent(); // Refresh count
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
      });
    } catch { return dateStr; }
  };

  const formatTime = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit',
      });
    } catch { return ''; }
  };

  if (loading) {
    return (
      <div className="app-container">
        <Navbar />
        <div className="loading-center" style={{ minHeight: '60vh' }}>
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="app-container">
      <Navbar />

      <motion.div
        className="event-detail"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back Button */}
        <motion.div
          className="event-detail-back"
          onClick={() => navigate('/')}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          id="back-to-events-btn"
        >
          <ArrowLeft size={18} />
          <span>Back to Events</span>
        </motion.div>

        {/* Banner */}
        <motion.div
          className="event-detail-banner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="banner-pattern" />
          <span style={{ fontSize: '3rem', zIndex: 1 }}>
            {categoryIcons[event.category] || '📌'}
          </span>
        </motion.div>

        {/* Category & Title */}
        <motion.div
          className="event-detail-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="event-detail-category">{event.category}</span>
          <h1 className="event-detail-title">{event.title}</h1>
        </motion.div>

        {/* Meta Info */}
        <motion.div
          className="event-detail-meta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="event-meta-item">
            <div className="event-meta-icon"><Calendar size={18} /></div>
            <div className="event-meta-info">
              <span className="event-meta-label">Date</span>
              <span className="event-meta-value">{formatDate(event.event_time)}</span>
            </div>
          </div>
          <div className="event-meta-item">
            <div className="event-meta-icon"><Clock size={18} /></div>
            <div className="event-meta-info">
              <span className="event-meta-label">Time</span>
              <span className="event-meta-value">{formatTime(event.event_time)}</span>
            </div>
          </div>
          <div className="event-meta-item">
            <div className="event-meta-icon"><MapPin size={18} /></div>
            <div className="event-meta-info">
              <span className="event-meta-label">Location</span>
              <span className="event-meta-value">{event.location}</span>
            </div>
          </div>
          <div className="event-meta-item">
            <div className="event-meta-icon"><Users size={18} /></div>
            <div className="event-meta-info">
              <span className="event-meta-label">Registered</span>
              <span className="event-meta-value">
                {event.registration_count} / {event.max_users} users
              </span>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          className="event-detail-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3>About This Event</h3>
          <p>{event.description}</p>
        </motion.div>

        {/* Min Users Info */}
        {event.min_users > 0 && (
          <motion.div
            style={{
              padding: '16px 20px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--warning-light)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              marginBottom: '32px',
              fontSize: '0.875rem',
              color: 'var(--warning)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
          >
            <UserCheck size={18} />
            <span>
              Minimum <strong>{event.min_users}</strong> participants required for this event.
              Currently <strong>{event.registration_count}</strong> registered.
            </span>
          </motion.div>
        )}

        {/* Registration Form */}
        <motion.div
          className="registration-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          id="registration-form-card"
        >
          <h3>Join This Event</h3>
          <p className="subtitle">Fill in your details to register for this event.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="full_name">
                <User size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                className="form-input"
                placeholder="Enter your full name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              />
              {errors.full_name && <p className="form-error">{errors.full_name}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                <Mail size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
              disabled={submitting}
              id="submit-join-btn"
            >
              {submitting ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }} />
                  Joining...
                </span>
              ) : (
                'Join'
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>

      {/* Success Modal */}
      <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)}>
        <div className="success-modal-content">
          <div className="success-icon">🎉</div>
          <h3>You're In!</h3>
          <p>You've successfully registered for <strong>{event.title}</strong>. We look forward to seeing you there!</p>
          <div style={{ marginTop: '24px' }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowSuccess(false);
                navigate('/');
              }}
              id="success-back-btn"
            >
              Browse More Events
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
