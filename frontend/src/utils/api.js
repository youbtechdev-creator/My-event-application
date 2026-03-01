const API_BASE = '/api';

async function request(url, options = {}) {
  const token = localStorage.getItem('admin-token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

// Admin API
export const adminApi = {
  login: (email, password) => request('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  }),

  getStats: () => request('/admin/stats'),

  getEvents: () => request('/admin/events'),

  createEvent: (eventData) => request('/admin/event', {
    method: 'POST',
    body: JSON.stringify(eventData),
  }),

  updateEvent: (id, eventData) => request(`/admin/event/${id}`, {
    method: 'PUT',
    body: JSON.stringify(eventData),
  }),

  deleteEvent: (id) => request(`/admin/event/${id}`, {
    method: 'DELETE',
  }),

  getParticipants: (eventId) => request(`/admin/event/${eventId}/participants`),
};

// User/Public API
export const eventApi = {
  getEvents: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/events${query ? `?${query}` : ''}`);
  },

  getEvent: (id) => request(`/events/${id}`),

  joinEvent: (id, data) => request(`/events/${id}/join`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  getCategories: () => request('/events/meta/categories'),
};
