import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Check for admin token (from AdminContext)
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
    }
    return Promise.reject(error);
  }
);

// Contact API
export const contactAPI = {
  submitForm: (data) => apiClient.post('/contacts', data),
  getAll: () => apiClient.get('/contacts'),
  getById: (id) => apiClient.get(`/contacts/${id}`),
  delete: (id) => apiClient.delete(`/contacts/${id}`),
  getUnreadCount: () => apiClient.get('/contacts/unread-count'),
};

// Admin API
export const adminAPI = {
  login: (credentials) => apiClient.post('/admin/login', credentials),
  initialize: (data) => apiClient.post('/admin/initialize', data),
  getProfile: () => apiClient.get('/admin/profile'),
};
