const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../database/db');
const { authenticateAdmin, JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

// Admin Login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    const admin = db.prepare('SELECT * FROM admin WHERE email = ?').get(email);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isMatch = bcrypt.compareSync(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, admin: { id: admin.id, email: admin.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Create Event
router.post('/event', authenticateAdmin, (req, res) => {
  try {
    const { title, description, event_time, min_users, max_users, location, category, is_published } = req.body;

    if (!title || !description || !event_time || !location || !category) {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    const stmt = db.prepare(`
      INSERT INTO events (title, description, event_time, min_users, max_users, location, category, is_published)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      title, description, event_time,
      min_users || 0, max_users || 100,
      location, category, is_published ? 1 : 0
    );

    const event = db.prepare('SELECT * FROM events WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(event);
  } catch (err) {
    console.error('Create event error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Update Event
router.put('/event/:id', authenticateAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, event_time, min_users, max_users, location, category, is_published } = req.body;

    const existing = db.prepare('SELECT * FROM events WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    const stmt = db.prepare(`
      UPDATE events SET title = ?, description = ?, event_time = ?, min_users = ?, max_users = ?, 
      location = ?, category = ?, is_published = ? WHERE id = ?
    `);

    stmt.run(
      title || existing.title,
      description || existing.description,
      event_time || existing.event_time,
      min_users !== undefined ? min_users : existing.min_users,
      max_users !== undefined ? max_users : existing.max_users,
      location || existing.location,
      category || existing.category,
      is_published !== undefined ? (is_published ? 1 : 0) : existing.is_published,
      id
    );

    const updated = db.prepare('SELECT * FROM events WHERE id = ?').get(id);
    res.json(updated);
  } catch (err) {
    console.error('Update event error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Delete Event
router.delete('/event/:id', authenticateAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM events WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    db.prepare('DELETE FROM events WHERE id = ?').run(id);
    res.json({ message: 'Event deleted successfully.' });
  } catch (err) {
    console.error('Delete event error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Get All Events (Admin)
router.get('/events', authenticateAdmin, (req, res) => {
  try {
    const events = db.prepare('SELECT * FROM events ORDER BY created_at DESC').all();
    
    // Add registration count to each event
    const eventsWithCount = events.map(event => {
      const count = db.prepare('SELECT COUNT(*) as count FROM event_registrations WHERE event_id = ?').get(event.id);
      return { ...event, registration_count: count.count };
    });

    res.json(eventsWithCount);
  } catch (err) {
    console.error('Get events error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Get Event Participants
router.get('/event/:id/participants', authenticateAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const event = db.prepare('SELECT * FROM events WHERE id = ?').get(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    const participants = db.prepare('SELECT * FROM event_registrations WHERE event_id = ? ORDER BY joined_at DESC').all(id);
    res.json({ event, participants });
  } catch (err) {
    console.error('Get participants error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Get Dashboard Stats
router.get('/stats', authenticateAdmin, (req, res) => {
  try {
    const totalEvents = db.prepare('SELECT COUNT(*) as count FROM events').get().count;
    const publishedEvents = db.prepare('SELECT COUNT(*) as count FROM events WHERE is_published = 1').get().count;
    const totalRegistrations = db.prepare('SELECT COUNT(*) as count FROM event_registrations').get().count;
    const recentRegistrations = db.prepare(`
      SELECT er.*, e.title as event_title 
      FROM event_registrations er 
      JOIN events e ON er.event_id = e.id 
      ORDER BY er.joined_at DESC LIMIT 5
    `).all();

    res.json({
      totalEvents,
      publishedEvents,
      unpublishedEvents: totalEvents - publishedEvents,
      totalRegistrations,
      recentRegistrations,
    });
  } catch (err) {
    console.error('Get stats error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
