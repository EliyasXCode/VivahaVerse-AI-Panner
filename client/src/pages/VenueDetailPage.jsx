import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Building, MapPin, Users, Sparkles, CheckCircle2, AlertCircle, Scale } from 'lucide-react';
import OptimizedImage from '../components/common/OptimizedImage';
import API from '../services/api';
import { useSaved } from '../context/SavedContext';
import toast from 'react-hot-toast';

const VenueDetailPage = ({ onOpenEnquiryModal }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);

  const { toggleCompareVenue, isVenueInCompare } = useSaved();

  useEffect(() => {
    const fetchVenue = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/venues/${slug}`);
        if (res.data.success) {
          setVenue(res.data.venue);
        }
      } catch (err) {
        toast.error('Venue not found');
      } finally {
        setLoading(false);
      }
    };
    fetchVenue();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-background-cream">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-serif text-xl font-bold text-wine">Loading Venue Profile...</p>
        </div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="min-h-screen pt-32 text-center bg-background-cream">
        <h2 className="font-serif text-3xl font-bold text-wine">Venue Not Found</h2>
        <Link to="/venues" className="text-gold underline mt-4 inline-block">Back to Venues</Link>
      </div>
    );
  }

  const inCompare = isVenueInCompare(venue._id || venue.slug);

  return (
    <div className="min-h-screen bg-background-cream pb-20 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-gold/20 pb-6">
          <div className="space-y-1">
            <span className="bg-gold text-wine text-xs uppercase font-bold px-3 py-1 rounded-full">
              {venue.category} • {venue.destinationName}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-wine">{venue.name}</h1>
            <p className="text-xs text-charcoal-muted font-light">{venue.venueStyle} • {venue.airportDistance} from nearest airport</p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => toggleCompareVenue(venue)}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold border flex items-center space-x-1.5 transition-colors ${
                inCompare
                  ? 'bg-gold text-wine border-gold font-bold'
                  : 'bg-white text-wine border-gold/40 hover:bg-gold hover:text-white'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>{inCompare ? 'In Compare List' : 'Add to Compare'}</span>
            </button>

            <button
              onClick={() => navigate(`/ai-planner?venue=${venue.name}`)}
              className="bg-wine text-gold hover:bg-wine-dark hover:text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-colors flex items-center space-x-1"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI About Venue</span>
            </button>

            <button
              onClick={onOpenEnquiryModal}
              className="bg-gold text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-wine shadow-md transition-colors"
            >
              Enquire Availability
            </button>
          </div>
        </div>

        {/* Hero Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 aspect-[16/10] overflow-hidden rounded-2xl shadow-luxury">
            <OptimizedImage src={venue.heroImage} alt={venue.name} aspectRatio="aspect-full" />
          </div>
          <div className="space-y-4">
            {venue.gallery && venue.gallery.length > 0 ? (
              venue.gallery.slice(0, 2).map((img, idx) => (
                <div key={idx} className="aspect-[16/10] overflow-hidden rounded-2xl shadow-luxury">
                  <OptimizedImage src={img} alt={`Venue Gallery ${idx}`} aspectRatio="aspect-full" />
                </div>
              ))
            ) : (
              <div className="aspect-[16/10] bg-rose-blush/20 rounded-2xl flex items-center justify-center text-xs text-charcoal-muted italic">
                Additional venue photos available on request
              </div>
            )}
          </div>
        </div>

        {/* Property Specs Strip */}
        <div className="bg-white rounded-2xl border border-gold/30 p-6 shadow-luxury grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-charcoal">
          <div>
            <span className="text-[10px] uppercase font-bold text-charcoal-muted block">Guest Capacity</span>
            <span className="font-serif font-bold text-lg text-wine">Up to {venue.capacityMax} Guests</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-charcoal-muted block">Room Inventory</span>
            <span className="font-serif font-bold text-lg text-wine">{venue.roomCount} Rooms / Suites</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-charcoal-muted block">Price Tier</span>
            <span className="font-serif font-bold text-lg text-wine">{venue.priceTier}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-charcoal-muted block">Starting Pricing</span>
            <span className="font-serif font-bold text-lg text-wine">
              {venue.priceOnRequest ? 'Price on Request' : `₹${(venue.startingPricePerDay/100000).toFixed(1)} Lakhs / Day`}
            </span>
          </div>
        </div>

        {/* Detailed Spaces & Amenities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
          
          {/* Indoor & Outdoor Spaces */}
          <div className="bg-white rounded-2xl border border-gold/30 p-6 shadow-luxury space-y-4">
            <h3 className="font-serif text-xl font-bold text-wine">Event Spaces & Lawns</h3>
            <div className="space-y-3">
              <div>
                <h5 className="font-bold text-wine uppercase text-[11px] mb-1">Indoor Ballrooms</h5>
                <ul className="list-disc list-inside space-y-1 text-charcoal-muted">
                  {venue.indoorSpaces?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-wine uppercase text-[11px] mb-1">Outdoor Lawns & Courtyards</h5>
                <ul className="list-disc list-inside space-y-1 text-charcoal-muted">
                  {venue.outdoorSpaces?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-2xl border border-gold/30 p-6 shadow-luxury space-y-4">
            <h3 className="font-serif text-xl font-bold text-wine">Signature Amenities</h3>
            <div className="grid grid-cols-2 gap-2 text-charcoal-muted">
              {venue.amenities?.map((a, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Why Couples Choose It & Things to Consider */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
          {venue.whyCouplesChooseIt && (
            <div className="bg-wine text-white rounded-2xl p-6 shadow-luxury space-y-3">
              <h4 className="font-serif text-xl font-bold text-gold">Why Couples Choose {venue.name}</h4>
              <ul className="space-y-2 text-rose-blush">
                {venue.whyCouplesChooseIt.map((w, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <Sparkles className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {venue.thingsToConsider && (
            <div className="bg-white border border-gold/30 rounded-2xl p-6 shadow-luxury space-y-3">
              <h4 className="font-serif text-xl font-bold text-wine flex items-center space-x-1.5">
                <AlertCircle className="w-4 h-4 text-gold" />
                <span>Things to Consider</span>
              </h4>
              <ul className="space-y-2 text-charcoal-muted">
                {venue.thingsToConsider.map((c, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-gold font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default VenueDetailPage;
