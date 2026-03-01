import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { adminApi } from '../utils/api';
import { useToast } from '../context/ToastContext';

const CATEGORIES = ['Technology', 'Business', 'Music', 'Sports', 'Education', 'Health', 'Art', 'Food', 'Social', 'Other'];

export default function AddEvent() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_time: '',
    min_users: 0,
    max_users: 100,
    location: '',
    category: 'Technology',
    is_published: false,
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.event_time || !formData.location) {
      addToast('Please fill in all required fields', 'error');
      return;
    }

    try {
      setLoading(true);
      await adminApi.createEvent(formData);
      addToast('Event created successfully!', 'success');
      navigate('/admin/manage-events');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Add Event">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ maxWidth: '720px' }}
      >
        <div className="card">
          <div className="card-body" style={{ padding: '32px' }}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="event-title">Title *</label>
                <input
                  type="text"
                  id="event-title"
                  className="form-input"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="event-desc">Description *</label>
                <textarea
                  id="event-desc"
                  className="form-input"
                  placeholder="Describe your event in detail..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="event-datetime">Event Date & Time *</label>
                  <input
                    type="datetime-local"
                    id="event-datetime"
                    className="form-input"
                    value={formData.event_time}
                    onChange={(e) => handleChange('event_time', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="event-location">Location *</label>
                  <input
                    type="text"
                    id="event-location"
                    className="form-input"
                    placeholder="Event location"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="event-min">Minimum Users</label>
                  <input
                    type="number"
                    id="event-min"
                    className="form-input"
                    min="0"
                    value={formData.min_users}
                    onChange={(e) => handleChange('min_users', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="event-max">Maximum Users</label>
                  <input
                    type="number"
                    id="event-max"
                    className="form-input"
                    min="1"
                    value={formData.max_users}
                    onChange={(e) => handleChange('max_users', parseInt(e.target.value) || 100)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="event-category">Category</label>
                <select
                  id="event-category"
                  className="form-input"
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <div className="toggle-wrapper">
                  <div
                    className={`toggle ${formData.is_published ? 'active' : ''}`}
                    onClick={() => handleChange('is_published', !formData.is_published)}
                    id="publish-toggle"
                  />
                  <span className="toggle-label">
                    {formData.is_published ? 'Published — visible to users' : 'Draft — hidden from users'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate('/admin/manage-events')}
                >
                  <ArrowLeft size={16} />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  id="create-event-btn"
                >
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} />
                      Creating...
                    </span>
                  ) : (
                    <>
                      <Save size={16} />
                      Create Event
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
