import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Calendar, Heart, MapPin, ArrowRight, SlidersHorizontal } from 'lucide-react';
import OptimizedImage from '../components/common/OptimizedImage';
import API from '../services/api';
import { useSaved } from '../context/SavedContext';

const REGIONS = ["All", "Rajasthan", "GOA", "KERALA", "UTTARAKHAND", "HIMACHAL PRADESH", "JAMMU & KASHMIR", "MAHARASHTRA", "TAMIL NADU", "Island Destinations"];
const STYLES = ["All", "Royal", "Palace", "Lakeside", "Beach", "Heritage", "Mountain", "Desert", "Forest", "Nature"];

const DestinationsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [region, setRegion] = useState(searchParams.get('region') || 'All');
  const [style, setStyle] = useState(searchParams.get('style') || 'All');
  const [maxBudget, setMaxBudget] = useState(searchParams.get('maxBudget') || '200');
  const [sort, setSort] = useState(searchParams.get('sort') || 'recommended');

  const { toggleFavoriteDestination, isDestinationFavorite } = useSaved();

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (region !== 'All') queryParams.append('region', region);
      if (style !== 'All') queryParams.append('style', style);
      if (maxBudget) queryParams.append('maxBudget', maxBudget);
      if (sort) queryParams.append('sort', sort);

      const res = await API.get(`/destinations?${queryParams.toString()}`);
      if (res.data.success) {
        setDestinations(res.data.destinations);
      }
    } catch (err) {
      console.warn('Failed to fetch destinations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [region, style, maxBudget, sort]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDestinations();
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Hero Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold block">
            India's Most Beloved Wedding Regions
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-wine">
            Extraordinary Places for Extraordinary Promises
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted font-light leading-relaxed">
            Filter through 25+ wedding destinations by budget tier, regional heritage, climate preference, and seasonal weather.
          </p>
          <div className="gold-divider w-24 mx-auto pt-2" />
        </div>

        {/* Filter Bar Controls */}
        <div className="bg-white rounded-2xl border border-gold/30 p-6 shadow-luxury space-y-4">
          
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gold absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by city (e.g. Udaipur, Goa, Rishikesh, Jaisalmer)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold/30 text-xs focus:outline-none focus:border-wine"
              />
            </div>
            <button
              type="submit"
              className="bg-wine text-gold px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-wine-dark transition-colors"
            >
              Search
            </button>
          </form>

          {/* Filter Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs pt-2">
            
            {/* Region Filter */}
            <div>
              <label className="block text-[11px] font-bold text-charcoal-muted uppercase mb-1">Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gold/30 bg-background-cream focus:outline-none"
              >
                {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {/* Wedding Style */}
            <div>
              <label className="block text-[11px] font-bold text-charcoal-muted uppercase mb-1">Wedding Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gold/30 bg-background-cream focus:outline-none"
              >
                {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Max Budget Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-bold text-charcoal-muted uppercase mb-1">
                <span>Max Budget:</span>
                <span className="text-wine font-bold">₹{maxBudget} Lakhs</span>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                step="5"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                className="w-full accent-wine cursor-pointer"
              />
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-[11px] font-bold text-charcoal-muted uppercase mb-1">Sort By</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gold/30 bg-background-cream focus:outline-none"
              >
                <option value="recommended">Featured & Recommended</option>
                <option value="budget-asc">Budget: Low to High</option>
                <option value="budget-desc">Budget: Luxury First</option>
                <option value="capacity">Guest Capacity</option>
                <option value="name">Destination Name</option>
              </select>
            </div>

          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-charcoal-muted border-b border-gold/20 pb-2">
          <span>Found <strong className="text-wine font-bold">{destinations.length}</strong> matching wedding destinations</span>
          <span className="italic">* Indicative estimates, actual venue quotes vary by season</span>
        </div>

        {/* Destinations Cards Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs text-charcoal-muted">Loading destinations...</p>
          </div>
        ) : destinations.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center space-y-4 border border-gold/20">
            <h3 className="font-serif text-2xl font-bold text-wine">No matching destinations found</h3>
            <p className="text-xs text-charcoal-muted">Try relaxing your search terms or budget slider.</p>
            <button
              onClick={() => {
                setSearch('');
                setRegion('All');
                setStyle('All');
                setMaxBudget('200');
              }}
              className="bg-gold text-white text-xs font-semibold px-6 py-2.5 rounded-full"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => {
              const isFav = isDestinationFavorite(dest._id || dest.slug);
              return (
                <div
                  key={dest.slug || dest.name}
                  className="group bg-white rounded-2xl border border-gold/20 overflow-hidden shadow-luxury hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <OptimizedImage
                      src={dest.heroImage}
                      alt={dest.name}
                      aspectRatio="aspect-full"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/70 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="bg-wine/80 text-gold text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-gold/30">
                        {dest.state}
                      </span>
                      <button
                        onClick={() => toggleFavoriteDestination(dest._id || dest.slug)}
                        className="p-2 rounded-full bg-white/80 text-wine hover:bg-wine hover:text-gold transition-colors shadow-md"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-wine text-wine' : ''}`} />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="font-serif text-2xl font-bold">{dest.name}</h3>
                      <p className="text-[11px] text-rose-blush italic">{dest.tagline}</p>
                    </div>
                  </div>

                  <div className="p-5 space-y-4 text-xs flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center border-b border-gold/10 pb-2">
                        <span className="font-bold text-wine text-sm">
                          ₹{dest.budgetRange?.min} – ₹{dest.budgetRange?.max} Lakhs*
                        </span>
                        <span className="text-[10px] text-charcoal-muted">Indicative</span>
                      </div>

                      <div className="space-y-1 text-charcoal-muted pt-1">
                        <div className="flex items-center space-x-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                          <span>Best: {dest.bestMonths?.join(', ') || 'Oct - Mar'}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                          <span>Airport: {dest.nearestAirport} ({dest.airportDistance})</span>
                        </div>
                      </div>

                      <p className="text-charcoal-muted leading-relaxed line-clamp-2 pt-1 font-light">
                        {dest.description}
                      </p>
                    </div>

                    <Link
                      to={`/destinations/${dest.slug}`}
                      className="w-full bg-rose-blush/20 hover:bg-wine hover:text-white text-wine text-xs font-semibold uppercase tracking-wider py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center space-x-1"
                    >
                      <span>Explore Destination</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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

export default DestinationsPage;
