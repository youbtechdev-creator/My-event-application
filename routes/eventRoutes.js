const express = require('express');
const { db } = require('../database/db');

const router = express.Router();

// Get All Published Events
router.get('/', (req, res) => {
  try {
    const { search, category } = req.query;
    let query = 'SELECT * FROM events WHERE is_published = 1';
    const params = [];

    if (search) {
      query += ' AND (title LIKE ? OR description LIKE ? OR location LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY event_time ASC';

    const events = db.prepare(query).all(...params);

    // Add registration count
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

// Get Single Event
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const event = db.prepare('SELECT * FROM events WHERE id = ? AND is_published = 1').get(id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    const count = db.prepare('SELECT COUNT(*) as count FROM event_registrations WHERE event_id = ?').get(id);
    event.registration_count = count.count;

    res.json(event);
  } catch (err) {
    console.error('Get event error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Join Event
router.post('/:id/join', (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, email } = req.body;

    // Validation
    if (!full_name || !email) {
      return res.status(400).json({ error: 'Full name and email are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    if (full_name.trim().length < 2) {
      return res.status(400).json({ error: 'Full name must be at least 2 characters.' });
    }

    // Check event exists and is published
    const event = db.prepare('SELECT * FROM events WHERE id = ? AND is_published = 1').get(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found.' });
    }

    // Check max capacity
    const count = db.prepare('SELECT COUNT(*) as count FROM event_registrations WHERE event_id = ?').get(id);
    if (count.count >= event.max_users) {
      return res.status(400).json({ error: 'Event is full. Maximum capacity reached.' });
    }

    // Check if already registered
    const existing = db.prepare('SELECT id FROM event_registrations WHERE event_id = ? AND email = ?').get(id, email);
    if (existing) {
      return res.status(400).json({ error: 'You are already registered for this event.' });
    }

    // Register
    db.prepare('INSERT INTO event_registrations (event_id, full_name, email) VALUES (?, ?, ?)').run(id, full_name.trim(), email.trim());

    res.status(201).json({ message: 'Successfully joined the event!', event_title: event.title });
  } catch (err) {
    console.error('Join event error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Get Categories
router.get('/meta/categories', (req, res) => {
  try {
    const categories = db.prepare('SELECT DISTINCT category FROM events WHERE is_published = 1').all();
    res.json(categories.map(c => c.category));
  } catch (err) {
    console.error('Get categories error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
