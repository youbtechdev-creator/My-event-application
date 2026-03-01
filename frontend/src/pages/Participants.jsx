import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Mail, Calendar, ArrowLeft, ChevronDown } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import { adminApi } from '../utils/api';
import { useToast } from '../context/ToastContext';

export default function Participants() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(searchParams.get('event') || '');
  const [participants, setParticipants] = useState([]);
  const [eventInfo, setEventInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEventId) {
      fetchParticipants(selectedEventId);
    } else {
      setParticipants([]);
      setEventInfo(null);
    }
  }, [selectedEventId]);

  const fetchEvents = async () => {
    try {
      setEventsLoading(true);
      const data = await adminApi.getEvents();
      setEvents(data);
      // Auto-select if event param exists
      if (searchParams.get('event')) {
        setSelectedEventId(searchParams.get('event'));
      }
    } catch (err) {
      addToast('Failed to load events', 'error');
    } finally {
      setEventsLoading(false);
    }
  };

  const fetchParticipants = async (eventId) => {
    try {
      setLoading(true);
      const data = await adminApi.getParticipants(eventId);
      setParticipants(data.participants);
      setEventInfo(data.event);
    } catch (err) {
      addToast('Failed to load participants', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      });
    } catch { return dateStr; }
  };

  return (
    <AdminLayout title="Participants">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Event Selector */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-body">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Select Event</label>
              <select
                className="form-input"
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                id="event-selector"
              >
                <option value="">-- Choose an event --</option>
                {events.map(event => (
                  <option key={event.id} value={event.id}>
                    {event.title} ({event.registration_count || 0} participants)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Event Info Banner */}
        {eventInfo && (
          <motion.div
            className="card"
            style={{ marginBottom: '24px' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>
                  {eventInfo.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {eventInfo.location} • {formatDate(eventInfo.event_time)}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--primary-light)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {participants.length}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Registered
                  </div>
                </div>
                <div style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--success-light)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success)' }}>
                    {eventInfo.max_users}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Max Capacity
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Participants Table */}
        {selectedEventId ? (
          loading ? (
            <div className="loading-center">
              <div className="spinner" />
            </div>
          ) : participants.length === 0 ? (
            <div className="table-container">
              <div className="empty-state">
                <div className="empty-state-icon">
                  <Users size={36} />
                </div>
                <h3>No Participants Yet</h3>
                <p>No one has registered for this event yet.</p>
              </div>
            </div>
          ) : (
            <motion.div
              className="table-container"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="table-header">
                <h3>
                  <Users size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                  Participants ({participants.length})
                </h3>
              </div>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Joined Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((p, index) => (
                      <tr key={p.id}>
                        <td style={{ color: 'var(--text-tertiary)', fontWeight: 600 }}>{index + 1}</td>
                        <td style={{ fontWeight: 600 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: 'var(--primary-light)',
                              color: 'var(--primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              flexShrink: 0,
                            }}>
                              {p.full_name.charAt(0).toUpperCase()}
                            </div>
                            {p.full_name}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                            <Mail size={14} />
                            {p.email}
                          </div>
                        </td>
                        <td style={{ color: 'var(--text-tertiary)', fontSize: '0.82rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Calendar size={14} />
                            {formatDate(p.joined_at)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )
        ) : (
          <div className="table-container">
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <h3>Select an Event</h3>
              <p>Choose an event from the dropdown above to view its participants.</p>
            </div>
          </div>
        )}
      </motion.div>
    </AdminLayout>
  );
}
