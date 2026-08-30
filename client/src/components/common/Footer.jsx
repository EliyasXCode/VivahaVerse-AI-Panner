import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Instagram, Facebook, Share2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-wine-dark text-rose-blush pt-16 pb-12 border-t border-gold/30 relative overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#B99256_1px,transparent_1px)] [background-size:32px_32px] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-rose-blush/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full border border-gold flex items-center justify-center bg-wine text-gold shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                VivahaVerse<span className="text-gold italic font-normal text-xl ml-1">AI</span>
              </span>
            </Link>

            <p className="text-xs text-rose-blush/80 leading-relaxed max-w-sm">
              Creating celebrations as extraordinary as the love stories behind them. Discover India's finest wedding destinations with database-grounded intelligence.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-gold">
              <a href="#" className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-wine transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-wine transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-wine transition-all">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white tracking-wider text-sm uppercase border-b border-gold/20 pb-1 inline-block">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-rose-blush/80">
              <li><Link to="/destinations" className="hover:text-gold transition-colors">Destinations</Link></li>
              <li><Link to="/venues" className="hover:text-gold transition-colors">Luxury Venues</Link></li>
              <li><Link to="/ai-planner" className="hover:text-gold transition-colors font-semibold text-gold">AI Wedding Planner</Link></li>
              <li><Link to="/visualizer" className="hover:text-gold transition-colors">AI Wedding Visualizer</Link></li>
              <li><Link to="/compare-venues" className="hover:text-gold transition-colors">Venue Compare Tool</Link></li>
            </ul>
          </div>

          {/* Planning */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white tracking-wider text-sm uppercase border-b border-gold/20 pb-1 inline-block">
              Planning Tools
            </h4>
            <ul className="space-y-2 text-xs text-rose-blush/80">
              <li><Link to="/budget-calculator" className="hover:text-gold transition-colors">Budget Calculator</Link></li>
              <li><Link to="/dashboard" className="hover:text-gold transition-colors">Wedding Checklist</Link></li>
              <li><Link to="/inspirations" className="hover:text-gold transition-colors">Real Wedding Inspirations</Link></li>
              <li><Link to="/dashboard" className="hover:text-gold transition-colors">Saved Wedding Plans</Link></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white tracking-wider text-sm uppercase border-b border-gold/20 pb-1 inline-block">
              Top Destinations
            </h4>
            <ul className="space-y-2 text-xs text-rose-blush/80">
              <li><Link to="/destinations?search=Udaipur" className="hover:text-gold transition-colors">Udaipur Palaces</Link></li>
              <li><Link to="/destinations?search=Jaipur" className="hover:text-gold transition-colors">Jaipur Royal Heritage</Link></li>
              <li><Link to="/destinations?search=Goa" className="hover:text-gold transition-colors">South Goa Beach Resorts</Link></li>
              <li><Link to="/destinations?search=Kerala" className="hover:text-gold transition-colors">Kerala Backwaters</Link></li>
              <li><Link to="/destinations?search=Jaisalmer" className="hover:text-gold transition-colors">Jaisalmer Desert Forts</Link></li>
              <li><Link to="/destinations?search=Rishikesh" className="hover:text-gold transition-colors">Rishikesh Ganges Riverside</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-rose-blush/60">
          <p>&copy; {new Date().getFullYear()} VivahaVerse AI. All rights reserved. Your Dream Destination. Designed by Intelligence.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/about" className="hover:text-gold">About Us</Link>
            <Link to="/contact" className="hover:text-gold">Contact Concierge</Link>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
