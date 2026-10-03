import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to automatically attach JWT Token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('campusconnect_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified error formatting
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected network error occurred';
    return Promise.reject(new Error(message));
  }
);

// --- Auth API calls ---
export const apiRegister = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const apiLogin = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const apiGetMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// --- Submission Upload API call (multipart/form-data) ---
export const apiUploadSubmission = async (formData) => {
  const response = await api.post('/submissions', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Health Check API call
export const checkHealthStatus = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
