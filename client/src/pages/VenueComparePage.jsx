import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Sparkles, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSaved } from '../context/SavedContext';
import API from '../services/api';
import toast from 'react-hot-toast';

const VenueComparePage = () => {
  const { compareVenuesList, toggleCompareVenue, clearCompare } = useSaved();
  const [aiAdvice, setAiAdvice] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleAskAI = async () => {
    if (compareVenuesList.length === 0) return;
    setLoadingAi(true);
    try {
      const res = await API.post('/venues/compare', {
        venueIds: compareVenuesList.map(v => v._id || v.slug)
      });
      if (res.data.success) {
        setAiAdvice(res.data.aiRecommendation);
        toast.success('AI venue comparative analysis generated!');
      }
    } catch (err) {
      toast.error('Failed to generate AI venue comparison');
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-cream pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-gold/20 pb-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest font-semibold text-gold block">Side-by-Side Matrix</span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-wine">Venue Compare Tool</h1>
            <p className="text-xs text-charcoal-muted font-light">Comparing up to 3 luxury Indian wedding properties.</p>
          </div>

          <div className="flex items-center space-x-3">
            {compareVenuesList.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs font-semibold text-charcoal-muted hover:text-red-600 px-3 py-2"
              >
                Clear All
              </button>
            )}

            <button
              onClick={handleAskAI}
              disabled={compareVenuesList.length === 0 || loadingAi}
              className="bg-wine text-gold hover:bg-wine-dark hover:text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg disabled:opacity-50 transition-colors flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loadingAi ? 'AI Analyzing...' : 'Ask AI Which Venue Fits Us Better'}</span>
            </button>
          </div>
        </div>

        {/* Empty State */}
        {compareVenuesList.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center space-y-4 border border-gold/30 shadow-luxury">
            <Scale className="w-12 h-12 text-gold mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-wine">No Venues Selected for Comparison</h3>
            <p className="text-xs text-charcoal-muted max-w-md mx-auto">
              Browse our verified venue directory and click the <strong>"Compare"</strong> button on any venue card to add up to 3 properties.
            </p>
            <Link
              to="/venues"
              className="bg-gold text-white text-xs font-semibold px-6 py-3 rounded-full inline-block hover:bg-wine"
            >
              Browse Venue Directory
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* AI Recommendation Banner */}
            {aiAdvice && (
              <div className="bg-wine text-white rounded-2xl p-6 border border-gold/40 shadow-2xl space-y-3 animate-fadeIn">
                <div className="flex items-center space-x-2 text-gold font-serif font-bold text-xl">
                  <Sparkles className="w-5 h-5" />
                  <span>Vivaha AI Comparative Insights</span>
                </div>
                <p className="text-xs text-rose-blush leading-relaxed whitespace-pre-line font-light">
                  {aiAdvice}
                </p>
              </div>
            )}

            {/* Comparison Matrix Table */}
            <div className="bg-white rounded-2xl border border-gold/30 shadow-2xl overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-wine text-white border-b border-gold/30">
                    <th className="p-4 w-1/4 font-serif text-sm font-bold border-r border-gold/20">Metric / Property</th>
                    {compareVenuesList.map((v) => (
                      <th key={v.slug} className="p-4 font-serif text-sm font-bold border-r border-gold/20 relative">
                        <div className="flex items-center justify-between">
                          <span>{v.name}</span>
                          <button
                            onClick={() => toggleCompareVenue(v)}
                            className="text-rose-blush hover:text-white p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-[10px] text-gold font-normal block font-sans">{v.destinationName}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/10 text-charcoal">
                  
                  {/* Category */}
                  <tr>
                    <td className="p-4 font-bold bg-background-cream border-r border-gold/20">Category</td>
                    {compareVenuesList.map(v => <td key={v.slug} className="p-4 border-r border-gold/10">{v.category}</td>)}
                  </tr>

                  {/* Max Capacity */}
                  <tr>
                    <td className="p-4 font-bold bg-background-cream border-r border-gold/20">Guest Capacity</td>
                    {compareVenuesList.map(v => <td key={v.slug} className="p-4 border-r border-gold/10 font-bold text-wine">Up to {v.capacityMax} Guests</td>)}
                  </tr>

                  {/* Room Inventory */}
                  <tr>
                    <td className="p-4 font-bold bg-background-cream border-r border-gold/20">Room Inventory</td>
                    {compareVenuesList.map(v => <td key={v.slug} className="p-4 border-r border-gold/10">{v.roomCount} Rooms</td>)}
                  </tr>

                  {/* Pricing Tier */}
                  <tr>
                    <td className="p-4 font-bold bg-background-cream border-r border-gold/20">Price Tier</td>
                    {compareVenuesList.map(v => <td key={v.slug} className="p-4 border-r border-gold/10 font-bold text-gold">{v.priceTier}</td>)}
                  </tr>

                  {/* Starting Daily Tariff */}
                  <tr>
                    <td className="p-4 font-bold bg-background-cream border-r border-gold/20">Starting Daily Tariff</td>
                    {compareVenuesList.map(v => (
                      <td key={v.slug} className="p-4 border-r border-gold/10">
                        {v.priceOnRequest ? 'Price on Request' : `₹${(v.startingPricePerDay/100000).toFixed(1)} Lakhs / Day`}
                      </td>
                    ))}
                  </tr>

                  {/* Airport Distance */}
                  <tr>
                    <td className="p-4 font-bold bg-background-cream border-r border-gold/20">Airport Distance</td>
                    {compareVenuesList.map(v => <td key={v.slug} className="p-4 border-r border-gold/10">{v.airportDistance}</td>)}
                  </tr>

                  {/* Indoor Ballrooms */}
                  <tr>
                    <td className="p-4 font-bold bg-background-cream border-r border-gold/20">Indoor Spaces</td>
                    {compareVenuesList.map(v => (
                      <td key={v.slug} className="p-4 border-r border-gold/10">
                        {v.indoorSpaces?.join(', ') || 'Available'}
                      </td>
                    ))}
                  </tr>

                  {/* Outdoor Lawns */}
                  <tr>
                    <td className="p-4 font-bold bg-background-cream border-r border-gold/20">Outdoor Lawns</td>
                    {compareVenuesList.map(v => (
                      <td key={v.slug} className="p-4 border-r border-gold/10">
                        {v.outdoorSpaces?.join(', ') || 'Available'}
                      </td>
                    ))}
                  </tr>

                  {/* Advantages */}
                  <tr>
                    <td className="p-4 font-bold bg-background-cream border-r border-gold/20">Key Advantages</td>
                    {compareVenuesList.map(v => (
                      <td key={v.slug} className="p-4 border-r border-gold/10 space-y-1">
                        {v.whyCouplesChooseIt?.map((w, i) => (
                          <div key={i} className="flex items-start space-x-1.5 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                            <span>{w}</span>
                          </div>
                        ))}
                      </td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default VenueComparePage;
