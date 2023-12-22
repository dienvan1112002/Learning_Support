// api.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/',
    // other custom settings
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // ADD TOKEN TO LOCAL STORAGE
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;