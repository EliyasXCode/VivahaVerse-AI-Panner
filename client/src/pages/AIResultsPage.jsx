import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Sparkles, Trophy, CheckCircle2, ArrowRight, Heart, Calendar, Clock, Image, Save } from 'lucide-react';
import OptimizedImage from '../components/common/OptimizedImage';
import API from '../services/api';
import toast from 'react-hot-toast';

const AIResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan, inputs } = location.state || {};
  const [saving, setSaving] = useState(false);

  if (!plan) {
    return (
      <div className="min-h-screen pt-32 text-center bg-background-cream">
        <h2 className="font-serif text-3xl font-bold text-wine">No Active AI Plan</h2>
        <p className="text-xs text-charcoal-muted mt-2">Please run the AI Wedding Planner wizard first.</p>
        <Link to="/ai-planner" className="bg-gold text-white px-6 py-2.5 rounded-full text-xs font-bold mt-4 inline-block">
          Launch AI Planner
        </Link>
      </div>
    );
  }

  const handleSavePlan = async () => {
    setSaving(true);
    try {
      const res = await API.post('/plans', {
        title: `${plan.weddingTheme || 'Royal'} Wedding Plan - ${inputs?.partner1Name || 'Couples'}`,
        guestCount: inputs?.guestCount || 150,
        budgetLakhs: inputs?.budgetLakhs || 45,
        weddingMonth: inputs?.weddingMonth || 'November',
        numberOfDays: inputs?.numberOfDays || 3,
        style: inputs?.style || 'Royal Palace',
        ceremonyType: inputs?.ceremonyType || 'Hindu',
        climatePreference: inputs?.climatePreference || 'Lake',
        recommendedDestinations: plan.recommendedDestinations,
        aiSummary: plan.summary,
        recommendedDestinationName: plan.recommendedDestination,
        weddingTheme: plan.weddingTheme,
        colourPalette: plan.colourPalette,
        events: plan.events,
        budgetBreakdown: plan.budgetBreakdown,
        itinerary: plan.itinerary,
        plannerTips: plan.plannerTips
      });

      if (res.data.success) {
        toast.success('Wedding plan saved to your account!');
      }
    } catch (err) {
      toast.error('Sign in to save plans to your dashboard');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-cream pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold block">
            Grounded Database Intelligence
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-wine">
            Your Wedding Could Begin Here
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted font-light leading-relaxed">
            {plan.summary}
          </p>
          
          <div className="pt-2 flex justify-center space-x-3">
            <button
              onClick={handleSavePlan}
              disabled={saving}
              className="bg-gold hover:bg-wine text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center space-x-1.5 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Plan to Account'}</span>
            </button>

            <button
              onClick={() => navigate('/visualizer')}
              className="bg-wine text-gold hover:bg-wine-dark hover:text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center space-x-1.5 transition-all"
            >
              <Image className="w-4 h-4" />
              <span>Generate AI Concept Look</span>
            </button>
          </div>
        </div>

        {/* Top 3 Match Cards Grid */}
        <div className="space-y-6">
          <h3 className="font-serif text-2xl font-bold text-wine text-center">Top Recommended Destination Matches</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plan.recommendedDestinations?.map((dest, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-gold/30 overflow-hidden shadow-2xl space-y-4 flex flex-col justify-between"
              >
                <div className="p-6 space-y-3">
                  
                  {/* Match Rank & Percentage */}
                  <div className="flex items-center justify-between">
                    <span className="bg-wine text-gold text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>#{idx + 1} Match</span>
                    </span>
                    <span className="font-serif font-bold text-2xl text-gold">
                      {dest.matchScore}% Match
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl font-bold text-wine">{dest.name}</h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed font-light">{dest.reason}</p>

                  <div className="border-t border-gold/10 pt-3 space-y-2 text-xs">
                    <p><strong>Estimated Budget:</strong> ₹{dest.estimatedBudget?.minimum} – ₹{dest.estimatedBudget?.maximum} Lakhs</p>
                    <p><strong>Venue Styles:</strong> {dest.bestVenueStyles?.join(', ')}</p>
                  </div>

                  {/* Advantages */}
                  <div className="space-y-1 pt-2">
                    <span className="text-[10px] font-bold text-wine uppercase">AI Highlight Pros:</span>
                    {dest.advantages?.map((adv, aIdx) => (
                      <div key={aIdx} className="flex items-center space-x-1.5 text-xs text-charcoal-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        <span>{adv}</span>
                      </div>
                    ))}
                  </div>

                </div>

                <div className="p-6 bg-background-cream border-t border-gold/20 flex gap-2">
                  <Link
                    to={`/destinations/${dest.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex-1 bg-wine text-gold hover:bg-wine-dark text-xs font-bold py-2.5 rounded-xl text-center uppercase"
                  >
                    View Destination
                  </Link>
                  <button
                    onClick={() => navigate(`/visualizer?destination=${dest.name}`)}
                    className="p-2.5 rounded-xl border border-gold text-wine hover:bg-gold hover:text-white"
                    title="Generate AI Concept"
                  >
                    <Image className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* 3-Day Itinerary Schedule */}
        {plan.itinerary && (
          <div className="bg-white rounded-3xl border border-gold/30 p-8 shadow-2xl space-y-6">
            <h3 className="font-serif text-2xl font-bold text-wine">Custom {inputs?.numberOfDays || 3}-Day Celebration Itinerary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plan.itinerary.map((dayItem) => (
                <div key={dayItem.day} className="bg-background-cream rounded-2xl p-5 border border-gold/20 space-y-3 text-xs">
                  <div className="bg-wine text-gold font-serif font-bold text-sm px-3 py-1 rounded-full w-max">
                    Day {dayItem.day}: {dayItem.title}
                  </div>
                  <div className="space-y-3 pt-2">
                    {dayItem.schedule?.map((item, sIdx) => (
                      <div key={sIdx} className="border-b border-gold/10 pb-2 space-y-0.5">
                        <div className="flex items-center space-x-1 text-gold font-bold text-[11px]">
                          <Clock className="w-3 h-3" />
                          <span>{item.time}</span>
                        </div>
                        <h5 className="font-semibold text-wine text-xs">{item.activity}</h5>
                        <p className="text-charcoal-muted text-[11px] font-light">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AIResultsPage;
