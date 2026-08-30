import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, Users, Calendar, Wallet, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('All');
  const [budget, setBudget] = useState('50');
  const [guests, setGuests] = useState('150');
  const [month, setMonth] = useState('November');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/destinations?search=${destination === 'All' ? '' : destination}&maxBudget=${budget}&guestCount=${guests}&month=${month}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      
      {/* Background Image with Slow Cinematic Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=2000&q=90"
          alt="Luxury Indian Destination Wedding Palace"
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="w-full h-full object-cover"
        />
        {/* Dark subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/90 via-charcoal/60 to-charcoal/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white space-y-8">
        
        {/* Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-gold/40 px-4 py-1.5 rounded-full"
        >
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="font-serif italic text-xs tracking-wider text-rose-blush">
            "Where Your Wedding Story Finds Its Perfect Place."
          </span>
        </motion.div>

        {/* Hero Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 max-w-4xl mx-auto"
        >
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none text-white drop-shadow-md">
            Find the Place Where <br />
            <span className="text-gold italic font-normal">Forever Begins.</span>
          </h1>
          <p className="font-sans text-sm sm:text-base text-rose-blush/90 max-w-2xl mx-auto font-light leading-relaxed">
            Discover India's most extraordinary wedding destinations, estimate your celebration cost, and let AI design a wedding experience made uniquely for your story.
          </p>
        </motion.div>

        {/* Hero CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <button
            onClick={() => navigate('/ai-planner')}
            className="w-full sm:w-auto bg-gold hover:bg-white hover:text-wine text-white font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-2xl hover:shadow-gold-glow transition-all duration-300 flex items-center justify-center space-x-2 group"
          >
            <Sparkles className="w-4 h-4 text-rose-blush group-hover:text-wine" />
            <span>Plan My Wedding with AI</span>
          </button>
          <button
            onClick={() => navigate('/destinations')}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full border border-white/30 backdrop-blur-sm transition-all"
          >
            Explore Destinations
          </button>
        </motion.div>

        {/* Floating Quick Destination Search Selector Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="max-w-5xl mx-auto bg-white/95 backdrop-blur-md border border-gold/30 rounded-2xl sm:rounded-full p-4 sm:p-3 shadow-2xl text-charcoal"
        >
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
            
            {/* Destination Select */}
            <div className="flex items-center space-x-2 px-3 py-2 border-b sm:border-b-0 sm:border-r border-gold/20">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
              <div className="text-left flex-1">
                <label className="block text-[10px] uppercase font-bold text-charcoal-muted">Destination</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-wine focus:outline-none cursor-pointer"
                >
                  <option value="All">All 25+ Destinations</option>
                  <option value="Udaipur">Udaipur, Rajasthan</option>
                  <option value="Jaipur">Jaipur, Rajasthan</option>
                  <option value="Goa">South Goa</option>
                  <option value="Kerala">Kerala Backwaters</option>
                  <option value="Jaisalmer">Jaisalmer Forts</option>
                  <option value="Rishikesh">Rishikesh Ganges</option>
                  <option value="Mussoorie">Mussoorie Hills</option>
                </select>
              </div>
            </div>

            {/* Budget Selector */}
            <div className="flex items-center space-x-2 px-3 py-2 border-b sm:border-b-0 sm:border-r border-gold/20">
              <Wallet className="w-4 h-4 text-gold flex-shrink-0" />
              <div className="text-left flex-1">
                <label className="block text-[10px] uppercase font-bold text-charcoal-muted">Max Budget</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-wine focus:outline-none cursor-pointer"
                >
                  <option value="30">Under ₹30 Lakhs</option>
                  <option value="50">Under ₹50 Lakhs</option>
                  <option value="75">Under ₹75 Lakhs</option>
                  <option value="150">₹1.5 Crores +</option>
                </select>
              </div>
            </div>

            {/* Guest Count */}
            <div className="flex items-center space-x-2 px-3 py-2 border-b sm:border-b-0 sm:border-r border-gold/20">
              <Users className="w-4 h-4 text-gold flex-shrink-0" />
              <div className="text-left flex-1">
                <label className="block text-[10px] uppercase font-bold text-charcoal-muted">Guest Count</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-wine focus:outline-none cursor-pointer"
                >
                  <option value="100">Intimate (50–100)</option>
                  <option value="150">Classic (100–200)</option>
                  <option value="300">Grand (200–500)</option>
                  <option value="600">Regal (500+)</option>
                </select>
              </div>
            </div>

            {/* Wedding Month */}
            <div className="flex items-center space-x-2 px-3 py-2">
              <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
              <div className="text-left flex-1">
                <label className="block text-[10px] uppercase font-bold text-charcoal-muted">Wedding Season</label>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-wine focus:outline-none cursor-pointer"
                >
                  <option value="November">Winter (Oct–Mar)</option>
                  <option value="April">Summer (Apr–Jun)</option>
                  <option value="August">Monsoon (Jul–Sep)</option>
                </select>
              </div>
            </div>

            {/* Search Submit Button */}
            <button
              type="submit"
              className="bg-wine hover:bg-wine-dark text-white p-3 sm:py-3.5 rounded-xl sm:rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors shadow-md"
            >
              <Search className="w-4 h-4 text-gold" />
              <span>Find My Destination</span>
            </button>

          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
