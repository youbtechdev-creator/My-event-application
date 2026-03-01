const { db, initialize } = require('./db');

// Initialize database first
initialize();

const sampleEvents = [
  {
    title: 'AI & Machine Learning Summit 2026',
    description: 'Join us for a full-day summit exploring the latest advances in artificial intelligence and machine learning. Featuring talks from industry leaders, hands-on workshops, and networking opportunities. Learn about transformer architectures, generative AI applications, and the future of intelligent systems.',
    event_time: '2026-04-15T09:00',
    min_users: 10,
    max_users: 200,
    location: 'Tech Convention Center, San Francisco',
    category: 'Technology',
    is_published: 1,
  },
  {
    title: 'Startup Pitch Night',
    description: 'An exciting evening where early-stage startups pitch their ideas to a panel of investors and mentors. Whether you are a founder looking for funding or an investor seeking the next big thing, this event is for you. Each startup gets 5 minutes to pitch followed by Q&A.',
    event_time: '2026-04-20T18:00',
    min_users: 5,
    max_users: 80,
    location: 'Innovation Hub, Downtown',
    category: 'Business',
    is_published: 1,
  },
  {
    title: 'Electronic Music Festival',
    description: 'Experience three stages of electronic music featuring top DJs from around the world. From deep house to techno, this festival has something for every electronic music fan. Food trucks, art installations, and more!',
    event_time: '2026-05-10T16:00',
    min_users: 50,
    max_users: 500,
    location: 'Riverside Park Amphitheater',
    category: 'Music',
    is_published: 1,
  },
  {
    title: 'Community Basketball Tournament',
    description: 'Annual 3v3 basketball tournament open to all skill levels. Compete for prizes and bragging rights while supporting local youth programs. Teams of 3-5 players welcome. Food and drinks provided.',
    event_time: '2026-04-28T10:00',
    min_users: 12,
    max_users: 60,
    location: 'City Sports Complex',
    category: 'Sports',
    is_published: 1,
  },
  {
    title: 'Web Development Bootcamp',
    description: 'A comprehensive weekend bootcamp covering modern web development with React, Node.js, and cloud deployment. Perfect for beginners and intermediate developers looking to level up their skills. Laptops required.',
    event_time: '2026-05-03T09:00',
    min_users: 8,
    max_users: 30,
    location: 'Digital Academy Campus',
    category: 'Education',
    is_published: 1,
  },
  {
    title: 'Mindfulness & Wellness Workshop',
    description: 'Take a break from the hustle and join our wellness workshop. Learn meditation techniques, stress management strategies, and holistic health practices from certified wellness coaches. Yoga mats provided.',
    event_time: '2026-04-22T14:00',
    min_users: 5,
    max_users: 40,
    location: 'Serenity Wellness Center',
    category: 'Health',
    is_published: 1,
  },
  {
    title: 'Contemporary Art Exhibition Opening',
    description: 'Be among the first to experience our new contemporary art exhibition featuring works from emerging artists worldwide. Wine and cheese reception included. Meet the artists and explore thought-provoking installations.',
    event_time: '2026-05-08T19:00',
    min_users: 0,
    max_users: 150,
    location: 'Metropolitan Art Gallery',
    category: 'Art',
    is_published: 1,
  },
  {
    title: 'Street Food Festival',
    description: 'Taste the world at our annual street food festival! Over 30 food vendors serving cuisines from around the globe. Live cooking demonstrations, food competitions, and family-friendly activities all day long.',
    event_time: '2026-05-15T11:00',
    min_users: 0,
    max_users: 1000,
    location: 'Central Square, Market District',
    category: 'Food',
    is_published: 1,
  },
  {
    title: 'Networking Mixer: Young Professionals',
    description: 'Connect with fellow young professionals in a relaxed, fun atmosphere. Speed networking sessions, icebreaker games, and plenty of opportunities to make meaningful connections. Drinks and appetizers included.',
    event_time: '2026-04-25T18:30',
    min_users: 10,
    max_users: 75,
    location: 'The Rooftop Lounge',
    category: 'Social',
    is_published: 1,
  },
  {
    title: 'Blockchain & Web3 Conference',
    description: 'Dive deep into the world of blockchain technology, decentralized finance, and Web3 applications. Expert panels, live demos, and technical workshops covering smart contracts, NFTs, and decentralized governance.',
    event_time: '2026-06-01T09:00',
    min_users: 15,
    max_users: 120,
    location: 'Crypto Hub Convention Center',
    category: 'Technology',
    is_published: 0,
  },
];

const stmt = db.prepare(`
  INSERT INTO events (title, description, event_time, min_users, max_users, location, category, is_published)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

// Check if events already exist
const count = db.prepare('SELECT COUNT(*) as count FROM events').get().count;
if (count === 0) {
  const insertMany = db.transaction((events) => {
    for (const event of events) {
      stmt.run(
        event.title, event.description, event.event_time,
        event.min_users, event.max_users, event.location,
        event.category, event.is_published
      );
    }
  });

  insertMany(sampleEvents);
  console.log(`✅ Seeded ${sampleEvents.length} sample events`);

  // Add some sample registrations
  const regStmt = db.prepare('INSERT INTO event_registrations (event_id, full_name, email) VALUES (?, ?, ?)');
  const sampleRegistrations = [
    { event_id: 1, full_name: 'John Doe', email: 'john@example.com' },
    { event_id: 1, full_name: 'Jane Smith', email: 'jane@example.com' },
    { event_id: 1, full_name: 'Mike Johnson', email: 'mike@example.com' },
    { event_id: 2, full_name: 'Sarah Williams', email: 'sarah@example.com' },
    { event_id: 2, full_name: 'Tom Brown', email: 'tom@example.com' },
    { event_id: 3, full_name: 'Emily Davis', email: 'emily@example.com' },
    { event_id: 5, full_name: 'Alex Chen', email: 'alex@example.com' },
    { event_id: 5, full_name: 'Lisa Park', email: 'lisa@example.com' },
    { event_id: 6, full_name: 'Robert Wilson', email: 'robert@example.com' },
    { event_id: 8, full_name: 'Maria Garcia', email: 'maria@example.com' },
  ];

  const insertRegs = db.transaction((regs) => {
    for (const reg of regs) {
      regStmt.run(reg.event_id, reg.full_name, reg.email);
    }
  });

  insertRegs(sampleRegistrations);
  console.log(`✅ Seeded ${sampleRegistrations.length} sample registrations`);
} else {
  console.log(`ℹ️ Events already exist (${count}). Skipping seed.`);
}

console.log('🎉 Database setup complete!');
process.exit(0);
