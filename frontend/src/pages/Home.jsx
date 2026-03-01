import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, Home as HomeIcon, Shield } from 'lucide-react';
import { eventApi } from '../utils/api';
import EventCard from '../components/EventCard';
import Navbar from '../components/Navbar';

const CATEGORIES = ['all', 'Technology', 'Business', 'Music', 'Sports', 'Education', 'Health', 'Art', 'Food', 'Social', 'Other'];

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, [search, category]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (category !== 'all') params.category = category;
      const data = await eventApi.getEvents(params);
      setEvents(data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  const [searchTimeout, setSearchTimeout] = useState(null);
  const onSearch = (value) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    const timeout = setTimeout(() => {
      setSearch(value);
    }, 400);
    setSearchTimeout(timeout);
  };

  return (
    <div className="app-container">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Discover Amazing{' '}
          <span className="gradient-text">Events</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Find and join exciting events happening near you.
          From tech meetups to music festivals, there's something for everyone.
        </motion.p>
      </motion.section>

      {/* Main Content */}
      <main className="page-container" style={{ paddingBottom: '60px' }}>
        {/* Search & Filter */}
        <motion.div
          className="search-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="search-input-wrapper">
            <Search />
            <input
              type="text"
              className="search-input"
              placeholder="Search events by name, description, or location..."
              onChange={(e) => onSearch(e.target.value)}
              id="event-search-input"
            />
          </div>
        </motion.div>

        {/* Category Chips */}
        <motion.div
          className="filter-chips"
          style={{ marginBottom: '32px' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-chip ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
              id={`filter-${cat}`}
            >
              {cat === 'all' ? 'All Events' : cat}
            </button>
          ))}
        </motion.div>

        {/* Events Grid */}
        {loading ? (
          <div className="loading-center">
            <div className="spinner" />
          </div>
        ) : events.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="empty-state-icon">
              <Calendar size={36} />
            </div>
            <h3>No events available</h3>
            <p>
              {search || category !== 'all'
                ? 'Try adjusting your search or filter to find events.'
                : 'Check back later for upcoming events!'}
            </p>
          </motion.div>
        ) : (
          <div className="events-grid">
            {events.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        )}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="bottom-nav">
        <button className="bottom-nav-item active" id="mobile-nav-home">
          <HomeIcon size={22} />
          <span>Events</span>
        </button>
        <button
          className="bottom-nav-item"
          onClick={() => navigate('/admin/login')}
          id="mobile-nav-admin"
        >
          <Shield size={22} />
          <span>Admin</span>
        </button>
      </div>
    </div>
  );
}
