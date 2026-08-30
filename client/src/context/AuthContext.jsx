import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await API.get('/auth/me');
      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data.success) {
        setUser(res.data.user);
        toast.success(`Welcome back, ${res.data.user.name}!`);
        return true;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const register = async (name, email, password, phone) => {
    try {
      const res = await API.post('/auth/register', { name, email, password, phone });
      if (res.data.success) {
        setUser(res.data.user);
        toast.success(`Welcome to VivahaVerse AI, ${res.data.user.name}!`);
        return true;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout');
      setUser(null);
      toast.success('Logged out successfully');
    } catch (err) {
      setUser(null);
    }
  };

  const updateChecklist = async (checklistItems) => {
    try {
      const res = await API.put('/auth/checklist', { checklist: checklistItems });
      if (res.data.success && user) {
        setUser({ ...user, checklist: res.data.checklist });
        toast.success('Checklist updated');
      }
    } catch (err) {
      toast.error('Failed to update checklist');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateChecklist, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
