import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

// Pages
const Home = lazy(() => import('./pages/Home'));
const EventDetails = lazy(() => import('./pages/EventDetails'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AddEvent = lazy(() => import('./pages/AddEvent'));
const ManageEvents = lazy(() => import('./pages/ManageEvents'));
const Participants = lazy(() => import('./pages/Participants'));

// Loading fallback
function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}>
      <div className="spinner" />
    </div>
  );
}

// Protected Route for Admin
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('admin-token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/event/:id" element={<EventDetails />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/add-event"
                element={
                  <ProtectedRoute>
                    <AddEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/manage-events"
                element={
                  <ProtectedRoute>
                    <ManageEvents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/participants"
                element={
                  <ProtectedRoute>
                    <Participants />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}
