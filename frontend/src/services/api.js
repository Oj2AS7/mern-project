import axios from 'axios';

// Use environment variable or fallback to production URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://mern-project-l3h4.onrender.com/api'
    : '/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// BMI API functions
export const bmiAPI = {
  addBMI: (data) => api.post('/bmi', data),
  getBMIHistory: () => api.get('/bmi/history'),
  getLatestBMI: () => api.get('/bmi/latest'),
  getBMIStats: () => api.get('/bmi/stats'),
  deleteBMI: (id) => api.delete(`/bmi/${id}`)
};

export default api;
