import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Wallet, Plane, Sparkles, Heart, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import OptimizedImage from '../components/common/OptimizedImage';
import Modal from '../components/common/Modal';
import API from '../services/api';
import { useSaved } from '../context/SavedContext';
import toast from 'react-hot-toast';

const DestinationDetailPage = ({ onOpenEnquiryModal }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);

  const { toggleFavoriteDestination, isDestinationFavorite } = useSaved();

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/destinations/${slug}`);
        if (res.data.success) {
          setDestination(res.data.destination);
          
          // Fetch venues for this destination
          const vRes = await API.get(`/venues?destination=${res.data.destination.name}`);
          if (vRes.data.success) {
            setVenues(vRes.data.venues);
          }
        }
      } catch (err) {
        toast.error('Destination not found');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-background-cream">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-serif text-xl font-bold text-wine">Loading Destination Details...</p>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen pt-32 text-center bg-background-cream">
        <h2 className="font-serif text-3xl font-bold text-wine">Destination Not Found</h2>
        <Link to="/destinations" className="text-gold underline mt-4 inline-block">Back to Destinations</Link>
      </div>
    );
  }

  const isFav = isDestinationFavorite(destination._id || destination.slug);

  return (
    <div className="min-h-screen bg-background-cream pb-20">
      
      {/* Hero Header Banner */}
      <section className="relative h-[65vh] flex items-end pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={destination.heroImage}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-wine-dark via-charcoal/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-white flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-gold text-wine text-xs uppercase font-bold px-3 py-1 rounded-full">
              {destination.state} • {destination.region}
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold">{destination.name}</h1>
            <p className="font-serif italic text-rose-blush text-lg sm:text-xl">{destination.tagline}</p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => toggleFavoriteDestination(destination._id || destination.slug)}
              className="p-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-wine border border-white/40 backdrop-blur-md transition-colors"
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-wine text-wine' : ''}`} />
            </button>

            <button
              onClick={() => navigate(`/visualizer?destination=${destination.name}`)}
              className="bg-white/20 hover:bg-white text-white hover:text-wine px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-white/40 backdrop-blur-md transition-colors flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Visualize Wedding</span>
            </button>

            <button
              onClick={onOpenEnquiryModal}
              className="bg-gold hover:bg-wine text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-xl transition-colors"
            >
              Plan Wedding Here
            </button>
          </div>
        </div>
      </section>

      {/* Quick Facts Strip */}
      <section className="bg-white border-b border-gold/30 py-6 text-xs text-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="space-y-1 border-r border-gold/20 pr-2">
            <span className="text-[10px] text-charcoal-muted uppercase font-bold block">Wedding Style</span>
            <span className="font-bold text-wine">{destination.weddingStyles?.slice(0, 2).join(', ')}</span>
          </div>
          <div className="space-y-1 border-r border-gold/20 pr-2">
            <span className="text-[10px] text-charcoal-muted uppercase font-bold block">Best Season</span>
            <span className="font-bold text-wine">{destination.bestMonths?.join(', ') || 'Oct - Mar'}</span>
          </div>
          <div className="space-y-1 border-r border-gold/20 pr-2">
            <span className="text-[10px] text-charcoal-muted uppercase font-bold block">Nearest Airport</span>
            <span className="font-bold text-wine">{destination.nearestAirport}</span>
          </div>
          <div className="space-y-1 border-r border-gold/20 pr-2">
            <span className="text-[10px] text-charcoal-muted uppercase font-bold block">Ideal Guests</span>
            <span className="font-bold text-wine">{destination.idealGuestMin} – {destination.idealGuestMax} Guests</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-charcoal-muted uppercase font-bold block">Indicative Budget</span>
            <span className="font-bold text-wine">₹{destination.budgetRange?.min} – ₹{destination.budgetRange?.max} Lakhs*</span>
          </div>
        </div>
      </section>

      {/* Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* About & Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-bold text-wine">About Marrying in {destination.name}</h2>
              <div className="gold-divider w-16" />
            </div>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light whitespace-pre-line">
              {destination.description}
            </p>

            {/* Highlights */}
            {destination.highlights && (
              <div className="space-y-3 pt-2">
                <h4 className="font-serif font-bold text-lg text-wine">Why Couples Love {destination.name}:</h4>
                <div className="space-y-2 text-xs text-charcoal">
                  {destination.highlights.map((h, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Travel & Airport Box */}
          <div className="bg-white rounded-2xl border border-gold/30 p-6 shadow-luxury space-y-4 text-xs">
            <h4 className="font-serif font-bold text-lg text-wine flex items-center space-x-2">
              <Plane className="w-4 h-4 text-gold" />
              <span>Getting There & Logistics</span>
            </h4>
            <div className="space-y-2 text-charcoal-muted border-t border-gold/10 pt-3">
              <p><strong>Airport:</strong> {destination.nearestAirport}</p>
              <p><strong>Distance to Venues:</strong> {destination.airportDistance}</p>
              <p><strong>Climate Overview:</strong> {destination.climate} atmosphere</p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate(`/budget-calculator?destination=${destination.name}`)}
                className="w-full bg-rose-blush/30 text-wine hover:bg-wine hover:text-white py-2.5 rounded-xl font-semibold text-xs transition-colors"
              >
                Calculate Budget for {destination.name}
              </button>
            </div>
          </div>

        </div>

        {/* Indicative Budget Section */}
        <div className="bg-white rounded-2xl border border-gold/30 p-8 shadow-luxury space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-widest text-gold font-bold">Transparent Pricing Engine</span>
            <h3 className="font-serif text-2xl font-bold text-wine">Indicative Wedding Budget in {destination.name}</h3>
            <p className="text-xs text-charcoal-muted italic">
              Prices are indicative estimates and vary according to venue availability, dates, guest count, and vendor choices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-background-cream border border-gold/20 space-y-2">
              <h5 className="font-serif font-bold text-wine text-base">Essential Celebration</h5>
              <div className="text-xl font-bold text-gold">₹{Math.round(destination.budgetRange?.min * 0.8)} – ₹{destination.budgetRange?.min} Lakhs</div>
              <p className="text-[11px] text-charcoal-muted">Intimate venues, boutique room blocks, standard seasonal floral decor.</p>
            </div>
            <div className="p-4 rounded-xl bg-wine text-white space-y-2 shadow-lg">
              <span className="bg-gold text-wine text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Most Popular</span>
              <h5 className="font-serif font-bold text-white text-base">Premium Celebration</h5>
              <div className="text-xl font-bold text-gold">₹{destination.budgetRange?.min} – ₹{destination.budgetRange?.max} Lakhs</div>
              <p className="text-[11px] text-rose-blush">5-star heritage properties, full catering spreads, custom mandap setups.</p>
            </div>
            <div className="p-4 rounded-xl bg-background-cream border border-gold/20 space-y-2">
              <h5 className="font-serif font-bold text-wine text-base">Royal Luxury</h5>
              <div className="text-xl font-bold text-gold">₹{destination.budgetRange?.max}+ Lakhs</div>
              <p className="text-[11px] text-charcoal-muted">Full palace buy-out, celebrity entertainment, imported floral decor.</p>
            </div>
          </div>
        </div>

        {/* Recommended Venues */}
        {venues.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl font-bold text-wine">Venues in {destination.name}</h3>
              <Link to={`/venues?destination=${destination.name}`} className="text-xs text-wine font-bold hover:underline">
                View All Venues &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {venues.map((venue) => (
                <div key={venue.slug} className="bg-white rounded-2xl border border-gold/20 overflow-hidden shadow-luxury p-4 flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-44 h-36 flex-shrink-0 overflow-hidden rounded-xl">
                    <OptimizedImage src={venue.heroImage} alt={venue.name} aspectRatio="aspect-full" />
                  </div>
                  <div className="space-y-2 text-xs flex-1 flex flex-col justify-between">
                    <div>
                      <span className="bg-gold/20 text-wine text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                        {venue.category}
                      </span>
                      <h4 className="font-serif font-bold text-lg text-wine mt-1">{venue.name}</h4>
                      <p className="text-charcoal-muted">Capacity: Max {venue.capacityMax} Guests • {venue.roomCount} Rooms</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gold/10">
                      <span className="font-bold text-wine">
                        {venue.priceOnRequest ? 'Price on request' : `From ₹${(venue.startingPricePerDay/100000).toFixed(1)} Lakhs/day`}
                      </span>
                      <Link to={`/venues/${venue.slug}`} className="text-gold font-bold hover:underline">
                        Details &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Editorial Photo Gallery */}
        {destination.gallery && destination.gallery.length > 0 && (
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-wine">Wedding Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {destination.gallery.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setLightboxImage(img)}
                  className="cursor-pointer overflow-hidden rounded-2xl aspect-[4/3] group relative"
                >
                  <OptimizedImage src={img} alt={`Gallery ${i}`} aspectRatio="aspect-full" className="group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-wine/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs">
                    Click to Enlarge
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        {destination.faqs && destination.faqs.length > 0 && (
          <div className="space-y-6 bg-white rounded-2xl border border-gold/30 p-8 shadow-luxury">
            <h3 className="font-serif text-2xl font-bold text-wine flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-gold" />
              <span>Frequently Asked Questions</span>
            </h3>
            <div className="space-y-4 text-xs">
              {destination.faqs.map((faq, fIdx) => (
                <div key={fIdx} className="border-b border-gold/10 pb-3 space-y-1">
                  <h5 className="font-semibold text-wine text-sm">{faq.question}</h5>
                  <p className="text-charcoal-muted leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Gallery Lightbox Modal */}
      <Modal isOpen={!!lightboxImage} onClose={() => setLightboxImage(null)} title="Destination Gallery" maxWidth="max-w-4xl">
        {lightboxImage && (
          <img src={lightboxImage} alt="Fullscreen gallery" className="w-full h-auto rounded-xl max-h-[80vh] object-contain" />
        )}
      </Modal>

    </div>
  );
};

export default DestinationDetailPage;
