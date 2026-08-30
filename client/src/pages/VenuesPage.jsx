import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Scale, Check, Building, MapPin, ArrowRight } from 'lucide-react';
import OptimizedImage from '../components/common/OptimizedImage';
import API from '../services/api';
import { useSaved } from '../context/SavedContext';

const TIER_OPTIONS = ["All", "Essential", "Premium", "Luxury"];

const VenuesPage = () => {
  const [searchParams] = useSearchParams();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [tier, setTier] = useState(searchParams.get('tier') || 'All');

  const { toggleCompareVenue, isVenueInCompare, compareVenuesList } = useSaved();

  const fetchVenues = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (tier !== 'All') queryParams.append('tier', tier);

      const res = await API.get(`/venues?${queryParams.toString()}`);
      if (res.data.success) {
        setVenues(res.data.venues);
      }
    } catch (err) {
      console.warn('Failed to fetch venues');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [tier]);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold block">
            Palaces, Forts & Beachfront Resorts
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-wine">
            Verified Indian Wedding Properties
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted font-light leading-relaxed">
            Explore world-renowned venue properties. Add up to 3 venues to your compare matrix for AI comparative insights.
          </p>
          <div className="gold-divider w-24 mx-auto pt-2" />
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl border border-gold/30 p-6 shadow-luxury flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gold absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by venue name or city (e.g. Leela Palace, Rambagh, Taj Exotica)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchVenues()}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold/30 text-xs focus:outline-none focus:border-wine"
            />
          </div>

          <div className="flex items-center space-x-3 text-xs w-full md:w-auto">
            <span className="font-bold text-charcoal-muted uppercase">Tier:</span>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="p-2.5 rounded-xl border border-gold/30 bg-background-cream focus:outline-none font-semibold text-wine"
            >
              {TIER_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            {compareVenuesList.length > 0 && (
              <Link
                to="/compare-venues"
                className="bg-wine text-gold px-4 py-2.5 rounded-xl font-bold flex items-center space-x-1 hover:bg-wine-dark"
              >
                <Scale className="w-4 h-4" />
                <span>Compare ({compareVenuesList.length})</span>
              </Link>
            )}
          </div>
        </div>

        {/* Venues Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs text-charcoal-muted">Loading venue properties...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue) => {
              const inCompare = isVenueInCompare(venue._id || venue.slug);
              return (
                <div
                  key={venue.slug || venue.name}
                  className="bg-white rounded-2xl border border-gold/20 overflow-hidden shadow-luxury hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <OptimizedImage src={venue.heroImage} alt={venue.name} aspectRatio="aspect-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/70 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="bg-wine text-gold text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border border-gold/30">
                        {venue.category}
                      </span>
                      <button
                        onClick={() => toggleCompareVenue(venue)}
                        className={`p-2 rounded-full text-xs font-semibold flex items-center space-x-1 transition-all shadow-md ${
                          inCompare
                            ? 'bg-gold text-wine font-bold'
                            : 'bg-white/80 text-wine hover:bg-wine hover:text-white'
                        }`}
                      >
                        <Scale className="w-3.5 h-3.5" />
                        <span>{inCompare ? 'Added' : 'Compare'}</span>
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="font-serif text-2xl font-bold">{venue.name}</h3>
                      <p className="text-[11px] text-rose-blush">{venue.destinationName}</p>
                    </div>
                  </div>

                  <div className="p-5 space-y-4 text-xs flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center border-b border-gold/10 pb-2">
                        <span className="font-bold text-wine text-sm">
                          {venue.priceOnRequest ? 'Price on request' : `Starting ₹${(venue.startingPricePerDay/100000).toFixed(1)} Lakhs/day`}
                        </span>
                        <span className="bg-rose-blush/30 text-wine text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                          {venue.priceTier}
                        </span>
                      </div>

                      <div className="space-y-1 text-charcoal-muted pt-1">
                        <p><strong>Guest Capacity:</strong> Up to {venue.capacityMax} Guests</p>
                        <p><strong>Room Blocks:</strong> {venue.roomCount} Rooms</p>
                        <p><strong>Style:</strong> {venue.venueStyle}</p>
                      </div>
                    </div>

                    <Link
                      to={`/venues/${venue.slug}`}
                      className="w-full bg-wine text-gold hover:bg-wine-dark hover:text-white text-xs font-semibold uppercase tracking-wider py-2.5 rounded-xl transition-all text-center block"
                    >
                      View Venue Details
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default VenuesPage;
