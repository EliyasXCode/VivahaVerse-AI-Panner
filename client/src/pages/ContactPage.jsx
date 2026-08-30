import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import API from '../services/api';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Wedding Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Message sent to VivahaVerse Senior Concierge!');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold block">
            Senior Concierge Desk
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-wine">
            Get in Touch
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted font-light leading-relaxed max-w-xl mx-auto">
            Have questions about venue availability, custom AI planning, or site visits? Connect with our senior wedding architects.
          </p>
          <div className="gold-divider w-24 mx-auto pt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details (5 Cols) */}
          <div className="md:col-span-5 bg-wine text-white rounded-3xl p-8 border border-gold/30 shadow-2xl space-y-6 text-xs">
            <h3 className="font-serif text-2xl font-bold text-gold">VivahaVerse AI Concierge</h3>
            
            <div className="space-y-4 text-rose-blush">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-serif text-sm">Head Office</strong>
                  <span>VivahaVerse Towers, Mehrauli Palace District, New Delhi - 110030</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <strong className="text-white block font-serif text-sm">Direct Phone</strong>
                  <span>+91 (011) 4567-8900 / +91 98100 12345</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <strong className="text-white block font-serif text-sm">Email Inquiry</strong>
                  <span>concierge@vivahaverse.ai</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form (7 Cols) */}
          <div className="md:col-span-7 bg-white rounded-3xl border border-gold/30 p-8 shadow-2xl space-y-4 text-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-wine mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-wine">Thank You for Connecting</h3>
                <p className="text-charcoal-muted">Our senior team will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-wine">Send Us a Message</h3>

                <div>
                  <label className="block font-semibold mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full p-3 rounded-xl border border-gold/30 bg-background-cream"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full p-3 rounded-xl border border-gold/30 bg-background-cream"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full p-3 rounded-xl border border-gold/30 bg-background-cream"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your wedding plans..."
                    className="w-full p-3 rounded-xl border border-gold/30 bg-background-cream"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-wine text-gold hover:bg-wine-dark hover:text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider transition-colors flex items-center space-x-1 pt-3"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactPage;
