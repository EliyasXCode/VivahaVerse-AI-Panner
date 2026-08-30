import axios from 'axios';
import toast from 'react-hot-toast';

const API = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response Interceptor for Error Handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong. Please try again.';
    console.error('[API Error Interceptor]', message);
    return Promise.reject(error);
  }
);

export default API;
