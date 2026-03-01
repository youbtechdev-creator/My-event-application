import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusCircle, Edit, Trash2, Users, Eye, EyeOff,
  AlertTriangle, Save, X, ArrowLeft
} from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import Modal from '../components/Modal';
import { adminApi } from '../utils/api';
import { useToast } from '../context/ToastContext';

const CATEGORIES = ['Technology', 'Business', 'Music', 'Sports', 'Education', 'Health', 'Art', 'Food', 'Social', 'Other'];

export default function ManageEvents() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getEvents();
      setEvents(data);
    } catch (err) {
      addToast('Failed to fetch events', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await adminApi.deleteEvent(deleteId);
      addToast('Event deleted successfully', 'success');
      setDeleteId(null);
      fetchEvents();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleTogglePublish = async (event) => {
    try {
      await adminApi.updateEvent(event.id, { is_published: !event.is_published });
      addToast(
        event.is_published ? 'Event unpublished' : 'Event published',
        'success'
      );
      fetchEvents();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleEditSubmit = async () => {
    if (!editEvent) return;
    try {
      setEditLoading(true);
      await adminApi.updateEvent(editEvent.id, editEvent);
      addToast('Event updated successfully', 'success');
      setEditEvent(null);
      fetchEvents();
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setEditLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      });
    } catch { return dateStr; }
  };

  return (
    <AdminLayout title="Manage Events">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="table-container">
          <div className="table-header">
            <h3>All Events ({events.length})</h3>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate('/admin/add-event')}
              id="add-event-btn"
            >
              <PlusCircle size={16} />
              Add Event
            </button>
          </div>

          {loading ? (
            <div className="loading-center">
              <div className="spinner" />
            </div>
          ) : events.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📅</div>
              <h3>No Events Yet</h3>
              <p>Create your first event to get started.</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/admin/add-event')}
              >
                <PlusCircle size={16} />
                Create Event
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Registrations</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td style={{ fontWeight: 600, maxWidth: '220px' }}>
                        <div style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {event.title}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-success">{event.category}</span>
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                        {formatDate(event.event_time)}
                      </td>
                      <td>
                        <span className={`badge ${event.is_published ? 'badge-success' : 'badge-warning'}`}>
                          {event.is_published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Users size={14} />
                          {event.registration_count || 0}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            className="btn btn-ghost btn-icon btn-sm"
                            onClick={() => handleTogglePublish(event)}
                            title={event.is_published ? 'Unpublish' : 'Publish'}
                            id={`toggle-publish-${event.id}`}
                          >
                            {event.is_published ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                          <button
                            className="btn btn-ghost btn-icon btn-sm"
                            onClick={() => setEditEvent({ ...event })}
                            title="Edit"
                            id={`edit-event-${event.id}`}
                          >
                            <Edit size={15} />
                          </button>
                          <button
                            className="btn btn-ghost btn-icon btn-sm"
                            onClick={() => navigate(`/admin/participants?event=${event.id}`)}
                            title="View Participants"
                            id={`view-participants-${event.id}`}
                          >
                            <Users size={15} />
                          </button>
                          <button
                            className="btn btn-ghost btn-icon btn-sm"
                            onClick={() => setDeleteId(event.id)}
                            title="Delete"
                            style={{ color: 'var(--danger)' }}
                            id={`delete-event-${event.id}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>

      {/* Delete Confirmation */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)}>
        <div className="confirm-dialog">
          <div className="confirm-icon">
            <AlertTriangle size={28} />
          </div>
          <h3>Delete Event?</h3>
          <p>This action cannot be undone. All registrations for this event will also be deleted.</p>
          <div className="confirm-dialog-actions">
            <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleDelete} id="confirm-delete-btn">
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editEvent} onClose={() => setEditEvent(null)} title="Edit Event" maxWidth="600px">
        {editEvent && (
          <form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(); }}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-input"
                value={editEvent.title}
                onChange={(e) => setEditEvent({ ...editEvent, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-input"
                value={editEvent.description}
                onChange={(e) => setEditEvent({ ...editEvent, description: e.target.value })}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date & Time</label>
                <input
                  type="datetime-local"
                  className="form-input"
                  value={editEvent.event_time}
                  onChange={(e) => setEditEvent({ ...editEvent, event_time: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-input"
                  value={editEvent.location}
                  onChange={(e) => setEditEvent({ ...editEvent, location: e.target.value })}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Min Users</label>
                <input
                  type="number"
                  className="form-input"
                  value={editEvent.min_users}
                  onChange={(e) => setEditEvent({ ...editEvent, min_users: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Max Users</label>
                <input
                  type="number"
                  className="form-input"
                  value={editEvent.max_users}
                  onChange={(e) => setEditEvent({ ...editEvent, max_users: parseInt(e.target.value) || 100 })}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-input"
                value={editEvent.category}
                onChange={(e) => setEditEvent({ ...editEvent, category: e.target.value })}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <div className="toggle-wrapper">
                <div
                  className={`toggle ${editEvent.is_published ? 'active' : ''}`}
                  onClick={() => setEditEvent({ ...editEvent, is_published: !editEvent.is_published })}
                />
                <span className="toggle-label">
                  {editEvent.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setEditEvent(null)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={editLoading} id="save-edit-btn">
                {editLoading ? 'Saving...' : (<><Save size={16} /> Save Changes</>)}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </AdminLayout>
  );
}
