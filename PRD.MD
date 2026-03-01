Event Management Web Application

Tech Stack: React + JavaScript (Frontend) | Node.js + Express (Backend) | SQLite (Database)
UI Library: shadcn/ui
Entry Point: server.js
Single package.json for entire project

1. 📌 Product Overview

The Event Management Application is a full-stack web platform with two roles:

Admin

User

The platform allows administrators to create and manage events, while users can browse available events and join them by submitting a simple registration form.

The application must be:

Mobile & Desktop responsive

Dark mode + Light mode supported

Smooth animated

Clean, modern, premium UI

Built using a single Node.js server (server.js)

Using SQLite as embedded database

2. 🎯 Objectives

Create a minimal yet scalable event management system

Ensure fast performance (SQLite embedded DB)

Maintain clean architecture in a single project

Provide smooth UI animations and premium UX

Support responsive design for all screen sizes

3. 👥 User Roles
   3.1 Admin Role
   Default Credentials

Email: admin123@gmali.com

Password: admin123

Admin Capabilities

Login securely

Access Admin Dashboard

Create new events

Edit events

Delete events

View event participants

Publish / Unpublish events

View event statistics

3.2 User Role
User Capabilities

View all published events

Click on an event

Fill small registration form:

Full Name

Email Address

Join event

Receive success confirmation

No user authentication required (simple event join system).

4. 🏗️ System Architecture
   Root
   │
   ├── server.js (Entry Point)
   ├── package.json (Single)
   │
   ├── /frontend (React)
   │ ├── components
   │ ├── pages
   │ ├── styles
   │
   ├── /routes
   │ ├── adminRoutes.js
   │ ├── eventRoutes.js
   │
   ├── /database
   │ ├── sqlite connection
   │ ├── schema setup
   │
   └── /middleware

Server serves:

API routes

React build files

5. 💾 Database Design (SQLite)
   5.1 Table: Admin
   Field Type
   id INTEGER PRIMARY KEY
   email TEXT
   password TEXT
   5.2 Table: Events
   Field Type
   id INTEGER PRIMARY KEY
   title TEXT
   description TEXT
   event_time TEXT
   min_users INTEGER
   max_users INTEGER
   location TEXT
   category TEXT
   is_published BOOLEAN
   created_at TEXT
   5.3 Table: EventRegistrations
   Field Type
   id INTEGER PRIMARY KEY
   event_id INTEGER
   full_name TEXT
   email TEXT
   joined_at TEXT
6. 🖥️ Frontend Pages (React + shadcn/ui)
   6.1 User Side Pages
   1️⃣ Home Page

Features:

List of all published events

Card-based layout

Search bar

Filter by category

Dark / Light toggle

Smooth hover animations

Each Event Card contains:

Title

Short description

Time

Location

Join button

2️⃣ Event Details Page

Full description

Event date/time

Minimum required users

Total registered users count

Registration Form:

Full Name

Email

Join Button

On successful submission:

Toast notification

Success modal

6.2 Admin Side Pages
1️⃣ Admin Login Page

Email field

Password field

Login button

Error handling

2️⃣ Admin Dashboard

Sidebar layout:

Dashboard

Add Event

Manage Events

Participants

Logout

Top bar:

Theme toggle

Admin profile badge

3️⃣ Add Event Page

Fields:

Title

Description

Event Date/Time

Minimum Users

Maximum Users

Location

Category

Publish toggle

Submit button

4️⃣ Manage Events Page

Table view:

Event title

Date

Published status

Edit button

Delete button

View participants

5️⃣ Participants Page

For selected event:

Table of joined users

Name

Email

Joined date

7. 🎨 UI/UX Design Requirements
   Design Style:

Super clean

Premium

Smooth animations

Card-based modern layout

Color Palette:

Primary: Sky Blue
Accent: Deep Blue
Background (Light): White
Background (Dark): Black
Text: High contrast

Animations:

Fade in page load

Slide transitions

Button hover scaling

Modal smooth open

Card hover glow

8. 📱 Responsiveness
   Mobile:

Bottom navigation (User)

Drawer sidebar (Admin)

Full width cards

Larger tap areas

Desktop:

Sidebar fixed (Admin)

3-column event grid

Modal centered layout

Breakpoints:

Mobile: <768px

Tablet: 768px–1024px

Desktop: >1024px

9. 🔐 Security

Admin authentication middleware

Basic password hashing

Input validation

Prevent SQL injection

Email format validation

Rate limiting (optional)

10. ⚙️ Backend API Endpoints
    Admin

POST /api/admin/login
POST /api/admin/event
PUT /api/admin/event/:id
DELETE /api/admin/event/:id
GET /api/admin/events
GET /api/admin/event/:id/participants

User

GET /api/events
GET /api/events/:id
POST /api/events/:id/join

11. 🌙 Dark Mode Implementation

Global theme provider

Local storage theme persistence

shadcn theme support

Animated transition between modes

12. 📊 Optional Future Features

Email confirmation

QR code ticket

Event capacity limit enforcement

Pagination

Analytics dashboard

CSV export

Multi-admin support

13. 🚀 Performance Requirements

SQLite embedded DB for fast local queries

Server response under 200ms

Lazy loading components

Optimized bundle

14. 📦 Deployment Strategy

Single Node.js server

React production build served via Express

SQLite database file in root

Ready for:

Local hosting

VPS

cPanel Node.js environment

15. 🧪 Testing Requirements

Manual test cases:

Admin login validation

Event creation

Join event flow

Dark mode toggle

Mobile responsiveness

16. 📌 Non-Functional Requirements

Clean code structure

Scalable folder architecture

Proper error handling

Professional animations

Consistent UI system

17. 🎯 Final Outcome

A full-stack, responsive, animated, modern event management system:

✔ One package.json
✔ One server.js entry
✔ React frontend
✔ Node backend
✔ SQLite embedded database
✔ Admin + User roles
✔ Premium shadcn UI
✔ Dark & Light mode
✔ Mobile & Desktop responsive
