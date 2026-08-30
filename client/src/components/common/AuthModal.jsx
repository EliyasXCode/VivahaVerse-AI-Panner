import React, { useState } from 'react';
import Modal from './Modal';
import { useAuth } from '../../context/AuthContext';
import { Sparkles } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const { login, register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    let success = false;
    if (isLogin) {
      success = await login(formData.email, formData.password);
    } else {
      success = await register(formData.name, formData.email, formData.password, formData.phone);
    }
    setSubmitting(false);
    if (success) onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isLogin ? 'Sign In to VivahaVerse' : 'Create Couples Account'} maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        
        {!isLogin && (
          <div>
            <label className="block font-semibold mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Ananya Sharma"
              className="w-full p-2.5 rounded-lg border border-gold/30 bg-white"
            />
          </div>
        )}

        <div>
          <label className="block font-semibold mb-1">Email Address *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="name@domain.com"
            className="w-full p-2.5 rounded-lg border border-gold/30 bg-white"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Password *</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full p-2.5 rounded-lg border border-gold/30 bg-white"
          />
        </div>

        {!isLogin && (
          <div>
            <label className="block font-semibold mb-1">Phone Number (Optional)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className="w-full p-2.5 rounded-lg border border-gold/30 bg-white"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-wine text-gold py-3 rounded-full font-bold uppercase tracking-wider hover:bg-wine-dark shadow-md flex items-center justify-center space-x-1 pt-3"
        >
          <Sparkles className="w-4 h-4" />
          <span>{submitting ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}</span>
        </button>

        <div className="text-center pt-2 border-t border-gold/20">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-wine font-semibold hover:underline"
          >
            {isLogin ? "Don't have an account? Register here" : "Already have an account? Sign In"}
          </button>
        </div>

      </form>
    </Modal>
  );
};

export default AuthModal;
