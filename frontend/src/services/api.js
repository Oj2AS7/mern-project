import axios from 'axios';

// Use relative base URL so Vite proxy handles API to backend
const api = axios.create({
  baseURL: '/api',
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
