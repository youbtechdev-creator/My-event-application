const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');
const { initialize } = require('./database/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
initialize();

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// API Routes
const adminRoutes = require('./routes/adminRoutes');
const eventRoutes = require('./routes/eventRoutes');

app.use('/api/admin', adminRoutes);
app.use('/api/events', eventRoutes);

// Serve React build in production
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

// Error handling
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║   🎉 Event Manager Server Running       ║
  ║   📡 http://localhost:${PORT}              ║
  ║   📦 SQLite Database Connected           ║
  ╚══════════════════════════════════════════╝
  `);
});

module.exports = app;
