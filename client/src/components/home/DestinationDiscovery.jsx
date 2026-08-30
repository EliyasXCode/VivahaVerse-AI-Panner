import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, Heart } from 'lucide-react';
import OptimizedImage from '../common/OptimizedImage';
import { useSaved } from '../../context/SavedContext';

const DestinationDiscovery = ({ destinations = [] }) => {
  const navigate = useNavigate();
  const { toggleFavoriteDestination, isDestinationFavorite } = useSaved();

  return (
    <section className="py-20 bg-background-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold block">
            Curated Places of Romance
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-wine">
            Where Will Your Story Begin?
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted font-light leading-relaxed">
            Explore India's premier destination wedding hubs, from lake palaces in Udaipur to sunset beaches in South Goa and misty valleys in Uttarakhand.
          </p>
          <div className="gold-divider w-24 mx-auto pt-2" />
        </div>

        {/* Destination Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.slice(0, 8).map((dest) => {
            const isFav = isDestinationFavorite(dest._id || dest.slug);
            return (
              <div
                key={dest.slug || dest.name}
                className="group bg-white rounded-2xl border border-gold/20 overflow-hidden shadow-luxury hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[4/5]">
                  <OptimizedImage
                    src={dest.heroImage}
                    alt={`${dest.name} Destination Wedding`}
                    aspectRatio="aspect-full"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Dark gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="bg-wine/80 backdrop-blur-md text-gold text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-gold/30">
                      {dest.state}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteDestination(dest._id || dest.slug);
                      }}
                      className="p-2 rounded-full bg-white/80 backdrop-blur-md text-wine hover:bg-wine hover:text-gold transition-colors shadow-md"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-wine text-wine' : ''}`} />
                    </button>
                  </div>

                  {/* Bottom Image Info Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white z-10">
                    <h3 className="font-serif text-2xl font-bold tracking-wide drop-shadow-md">
                      {dest.name}
                    </h3>
                    <p className="text-[11px] font-sans text-rose-blush/90 line-clamp-1 italic font-light">
                      {dest.weddingStyles?.slice(0, 3).join(' • ')}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between text-xs">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-charcoal-muted border-b border-gold/10 pb-2">
                      <span className="font-semibold text-wine text-sm">
                        ₹{dest.budgetRange?.min}–₹{dest.budgetRange?.max} Lakhs*
                      </span>
                      <span className="text-[10px] text-charcoal-muted">Indicative Cost</span>
                    </div>

                    <div className="flex items-center space-x-1.5 text-charcoal-muted pt-1">
                      <Calendar className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span>Best: {dest.bestMonths?.join(', ') || 'Oct - Mar'}</span>
                    </div>

                    <p className="text-charcoal-muted leading-relaxed line-clamp-2 pt-1 font-light">
                      {dest.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      to={`/destinations/${dest.slug}`}
                      className="w-full bg-rose-blush/20 hover:bg-wine hover:text-white text-wine text-xs font-semibold uppercase tracking-wider py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center space-x-1 group-hover:bg-wine group-hover:text-white"
                    >
                      <span>Explore {dest.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Pricing Disclaimer Note */}
        <div className="text-center pt-2">
          <p className="text-[11px] text-charcoal-muted italic">
            * Estimated cost range covers venue daily tariff, accommodation room blocks, food catering & base decor. Actual quotes vary by date availability.
          </p>
        </div>

      </div>
    </section>
  );
};

export default DestinationDiscovery;
