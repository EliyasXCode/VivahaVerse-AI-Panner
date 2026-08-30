import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Heart, User, Menu, X, ChevronDown, Scale, Compass } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSaved } from '../../context/SavedContext';

const REGIONAL_DESTINATIONS = [
  {
    region: "RAJASTHAN",
    destinations: ["Udaipur", "Jaipur", "Jodhpur", "Jaisalmer", "Pushkar", "Ranthambore"]
  },
  {
    region: "GOA",
    destinations: ["North Goa", "South Goa"]
  },
  {
    region: "KERALA",
    destinations: ["Kochi", "Kumarakom", "Alleppey", "Kovalam"]
  },
  {
    region: "UTTARAKHAND",
    destinations: ["Rishikesh", "Mussoorie", "Jim Corbett", "Dehradun"]
  },
  {
    region: "HIMACHAL PRADESH",
    destinations: ["Shimla", "Manali", "Dharamshala"]
  },
  {
    region: "JAMMU & KASHMIR",
    destinations: ["Srinagar", "Pahalgam"]
  },
  {
    region: "MAHARASHTRA",
    destinations: ["Mumbai", "Lonavala", "Pune", "Mahabaleshwar"]
  },
  {
    region: "SOUTH INDIA & ISLANDS",
    destinations: ["Bengaluru", "Coorg", "Chennai", "Mahabalipuram", "Andaman"]
  }
];

const Navbar = ({ onOpenEnquiryModal, onOpenAuthModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { favoriteDestinations, compareVenuesList } = useSaved();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md shadow-luxury py-3 border-b border-gold/20'
          : 'bg-gradient-to-b from-wine-dark/80 via-wine-dark/40 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center bg-wine text-gold shadow-md">
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <span className={`font-serif text-2xl font-bold tracking-tight block leading-tight ${scrolled ? 'text-wine' : 'text-white'}`}>
                VivahaVerse<span className="text-gold italic font-normal text-xl ml-1">AI</span>
              </span>
              <span className={`text-[9px] uppercase tracking-widest block font-sans ${scrolled ? 'text-charcoal-muted' : 'text-rose-blush'}`}>
                Intelligent Wedding Planner
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-gold ${
                scrolled ? 'text-charcoal' : 'text-white'
              }`}
            >
              Home
            </Link>

            {/* Mega Menu Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <Link
                to="/destinations"
                className={`text-sm font-medium flex items-center space-x-1 hover:text-gold py-2 transition-colors ${
                  scrolled ? 'text-charcoal' : 'text-white'
                }`}
              >
                <span>Destinations</span>
                <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
              </Link>

              {megaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-background-cream text-charcoal border border-gold/30 rounded-xl shadow-2xl p-6 grid grid-cols-4 gap-6 animate-fadeIn">
                  {REGIONAL_DESTINATIONS.map((group, idx) => (
                    <div key={idx} className="space-y-2">
                      <h4 className="font-serif font-bold text-xs text-wine tracking-wider border-b border-gold/20 pb-1">
                        {group.region}
                      </h4>
                      <ul className="space-y-1 text-xs">
                        {group.destinations.map((dest, dIdx) => (
                          <li key={dIdx}>
                            <Link
                              to={`/destinations?search=${dest}`}
                              className="text-charcoal-muted hover:text-wine hover:font-medium transition-colors block py-0.5"
                            >
                              {dest}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="col-span-4 bg-rose-blush/20 rounded-lg p-3 flex items-center justify-between mt-2">
                    <span className="text-xs font-serif italic text-wine">Explore all 25+ wedding destinations across India with AI filters</span>
                    <Link to="/destinations" className="text-xs font-semibold text-wine underline hover:text-gold">
                      View All Destinations &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/venues"
              className={`text-sm font-medium transition-colors hover:text-gold ${
                scrolled ? 'text-charcoal' : 'text-white'
              }`}
            >
              Venues
            </Link>

            <Link
              to="/ai-planner"
              className="text-sm font-medium text-gold flex items-center space-x-1 font-semibold hover:text-gold-light transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Planner</span>
            </Link>

            <Link
              to="/visualizer"
              className={`text-sm font-medium transition-colors hover:text-gold ${
                scrolled ? 'text-charcoal' : 'text-white'
              }`}
            >
              Visualizer
            </Link>

            <Link
              to="/budget-calculator"
              className={`text-sm font-medium transition-colors hover:text-gold ${
                scrolled ? 'text-charcoal' : 'text-white'
              }`}
            >
              Budget
            </Link>

            <Link
              to="/inspirations"
              className={`text-sm font-medium transition-colors hover:text-gold ${
                scrolled ? 'text-charcoal' : 'text-white'
              }`}
            >
              Inspirations
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Venue Compare Pill */}
            {compareVenuesList.length > 0 && (
              <Link
                to="/compare-venues"
                className="relative flex items-center space-x-1 text-xs px-2.5 py-1.5 rounded-full bg-rose-blush/40 text-wine border border-rose-muted hover:bg-rose-blush"
                title="Compare Venues"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare</span>
                <span className="ml-1 bg-wine text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-bold">
                  {compareVenuesList.length}
                </span>
              </Link>
            )}

            {/* Favorites Icon */}
            <Link
              to="/dashboard"
              className={`relative p-2 rounded-full transition-colors ${
                scrolled ? 'text-charcoal hover:bg-rose-blush/30' : 'text-white hover:bg-white/10'
              }`}
              title="Saved Favorites"
            >
              <Heart className="w-5 h-5" />
              {favoriteDestinations.length > 0 && (
                <span className="absolute top-1 right-1 bg-wine text-gold text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {favoriteDestinations.length}
                </span>
              )}
            </Link>

            {/* Auth/Profile */}
            {user ? (
              <div className="relative group">
                <button
                  className={`flex items-center space-x-2 text-sm font-medium p-1.5 rounded-full border transition-colors ${
                    scrolled ? 'border-gold/40 text-wine' : 'border-white/40 text-white'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span className="text-xs font-semibold max-w-[80px] truncate">{user.name}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gold/20 rounded-xl shadow-xl py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all text-xs">
                  <Link to="/dashboard" className="block px-4 py-2 text-charcoal hover:bg-rose-blush/20 font-medium">
                    My Wedding Dashboard
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-wine font-bold hover:bg-rose-blush/20">
                      Admin Control Center
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-rose-blush/20 font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className={`text-xs font-semibold px-3 py-2 rounded-full transition-colors ${
                  scrolled ? 'text-wine hover:bg-rose-blush/20' : 'text-white hover:bg-white/10'
                }`}
              >
                Sign In
              </button>
            )}

            {/* Primary CTA */}
            <button
              onClick={() => navigate('/ai-planner')}
              className="bg-gold hover:bg-wine text-white text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full shadow-md hover:shadow-gold-glow transition-all duration-300 flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-blush" />
              <span>Plan My Wedding</span>
            </button>

          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={() => navigate('/ai-planner')}
              className="bg-gold text-white text-[11px] font-bold uppercase px-3 py-1.5 rounded-full"
            >
              AI Plan
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${scrolled ? 'text-wine' : 'text-white'}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background-cream text-charcoal border-b border-gold/30 px-6 py-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-3 font-serif text-lg">
            <Link to="/" className="hover:text-wine">Home</Link>
            <Link to="/destinations" className="hover:text-wine">Destinations (25+ Regions)</Link>
            <Link to="/venues" className="hover:text-wine">Venues</Link>
            <Link to="/ai-planner" className="text-gold font-bold flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>AI Wedding Planner</span>
            </Link>
            <Link to="/visualizer" className="hover:text-wine">Wedding Visualizer</Link>
            <Link to="/budget-calculator" className="hover:text-wine">Budget Calculator</Link>
            <Link to="/inspirations" className="hover:text-wine">Real Inspirations</Link>
            <Link to="/dashboard" className="hover:text-wine">My Saved Plans</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-wine font-bold">Admin Portal</Link>
            )}
          </nav>

          <div className="pt-4 border-t border-gold/20 flex flex-col space-y-3">
            {!user ? (
              <button
                onClick={onOpenAuthModal}
                className="w-full text-center py-2 text-wine font-semibold border border-wine/30 rounded-full"
              >
                Sign In / Register
              </button>
            ) : (
              <button
                onClick={logout}
                className="w-full text-center py-2 text-red-600 font-semibold border border-red-200 rounded-full"
              >
                Sign Out
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiryModal();
              }}
              className="w-full bg-wine text-gold text-xs uppercase font-bold py-3 rounded-full text-center shadow-lg"
            >
              Submit Wedding Enquiry
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
