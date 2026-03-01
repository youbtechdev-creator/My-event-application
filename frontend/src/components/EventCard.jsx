import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const categoryIcons = {
  'Technology': '💻',
  'Business': '💼',
  'Music': '🎵',
  'Sports': '⚽',
  'Education': '📚',
  'Health': '🏥',
  'Art': '🎨',
  'Food': '🍕',
  'Social': '🎉',
  'Other': '📌',
};

export default function EventCard({ event, index = 0 }) {
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="event-card"
      onClick={() => navigate(`/event/${event.id}`)}
      id={`event-card-${event.id}`}
    >
      <div className="event-card-banner">
        <div className="banner-pattern" />
        <div className="banner-icon">
          <span style={{ fontSize: '1.5rem' }}>
            {categoryIcons[event.category] || '📌'}
          </span>
        </div>
        <span className="event-card-category">{event.category}</span>
      </div>

      <div className="event-card-content">
        <h3 className="event-card-title">{event.title}</h3>
        <p className="event-card-desc">{event.description}</p>

        <div className="event-card-meta">
          <div className="event-card-meta-item">
            <Calendar size={15} />
            <span>{formatDate(event.event_time)}</span>
          </div>
          <div className="event-card-meta-item">
            <Clock size={15} />
            <span>{formatTime(event.event_time)}</span>
          </div>
          <div className="event-card-meta-item">
            <MapPin size={15} />
            <span>{event.location}</span>
          </div>
        </div>
      </div>

      <div className="event-card-actions">
        <button className="btn btn-primary btn-sm" id={`join-btn-${event.id}`}>
          View & Join
        </button>
        <div className="event-card-users">
          <Users size={14} />
          <span>{event.registration_count || 0} joined</span>
        </div>
      </div>
    </motion.div>
  );
}
