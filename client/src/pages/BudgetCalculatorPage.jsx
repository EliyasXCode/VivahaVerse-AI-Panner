import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calculator, Sparkles, PieChart, CheckCircle2, TrendingDown } from 'lucide-react';
import API from '../services/api';
import toast from 'react-hot-toast';

const DESTINATIONS = ["Udaipur", "Jaipur", "South Goa", "Kerala", "Jaisalmer", "Rishikesh", "Mussoorie", "Jim Corbett"];

const BudgetCalculatorPage = () => {
  const [searchParams] = useSearchParams();

  const [destinationName, setDestinationName] = useState(searchParams.get('destination') || 'Udaipur');
  const [guestCount, setGuestCount] = useState(150);
  const [numberOfDays, setNumberOfDays] = useState(3);
  const [roomCount, setRoomCount] = useState(75);
  const [eventsCount, setEventsCount] = useState(4);
  const [selectedTier, setSelectedTier] = useState('premium'); // essential, premium, luxury

  const [loading, setLoading] = useState(false);
  const [budgetData, setBudgetData] = useState(null);

  const calculateBudget = async () => {
    setLoading(true);
    try {
      const res = await API.post('/ai/budget-advice', {
        destinationName,
        guestCount,
        numberOfDays,
        roomCount,
        eventsCount
      });

      if (res.data.success) {
        setBudgetData(res.data);
      }
    } catch (err) {
      toast.error('Calculation failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateBudget();
  }, [destinationName, guestCount, numberOfDays, roomCount, eventsCount]);

  const currentTierData = budgetData?.budgets ? budgetData.budgets[selectedTier] : null;

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 bg-rose-blush/30 text-wine px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-gold" />
            <span>Deterministic Destination Budget Engine</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-wine">
            Interactive Wedding Cost Calculator
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted font-light leading-relaxed">
            Compute realistic, itemized celebration budgets based on real venue database pricing min/max bounds.
          </p>
          <div className="gold-divider w-24 mx-auto pt-2" />
        </div>

        {/* Input Parameters Grid */}
        <div className="bg-white rounded-3xl border border-gold/30 p-6 sm:p-8 shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
          <div>
            <label className="block font-bold text-charcoal-muted uppercase mb-1">Destination</label>
            <select
              value={destinationName}
              onChange={(e) => setDestinationName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gold/30 bg-background-cream focus:outline-none font-semibold text-wine"
            >
              {DESTINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className="block font-bold text-charcoal-muted uppercase mb-1">Guests ({guestCount})</label>
            <input
              type="range"
              min="50"
              max="600"
              step="10"
              value={guestCount}
              onChange={(e) => {
                setGuestCount(Number(e.target.value));
                setRoomCount(Math.ceil(Number(e.target.value) / 2));
              }}
              className="w-full accent-wine cursor-pointer mt-2"
            />
          </div>

          <div>
            <label className="block font-bold text-charcoal-muted uppercase mb-1">Duration (Days)</label>
            <select
              value={numberOfDays}
              onChange={(e) => setNumberOfDays(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-gold/30 bg-background-cream focus:outline-none font-semibold text-wine"
            >
              <option value={2}>2 Days</option>
              <option value={3}>3 Days</option>
              <option value={4}>4 Days</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-charcoal-muted uppercase mb-1">Rooms ({roomCount})</label>
            <input
              type="number"
              value={roomCount}
              onChange={(e) => setRoomCount(Number(e.target.value))}
              className="w-full p-2 rounded-xl border border-gold/30 bg-background-cream focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-charcoal-muted uppercase mb-1">Events ({eventsCount})</label>
            <select
              value={eventsCount}
              onChange={(e) => setEventsCount(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-gold/30 bg-background-cream focus:outline-none font-semibold text-wine"
            >
              <option value={3}>3 Functions</option>
              <option value={4}>4 Functions</option>
              <option value={5}>5 Functions</option>
            </select>
          </div>
        </div>

        {/* Tier Selector Buttons */}
        <div className="flex justify-center space-x-3 text-xs">
          {['essential', 'premium', 'luxury'].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTier(t)}
              className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider transition-all shadow-md ${
                selectedTier === t
                  ? 'bg-wine text-gold shadow-gold-glow'
                  : 'bg-white text-charcoal border border-gold/30 hover:border-gold'
              }`}
            >
              {t} Tier
            </button>
          ))}
        </div>

        {/* Results Card Display */}
        {currentTierData && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Total Highlight (5 Cols) */}
            <div className="lg:col-span-5 bg-wine text-white rounded-3xl p-8 border border-gold/30 shadow-2xl space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-bold text-gold">Estimated Total Celebration Budget</span>
                <div className="font-serif text-5xl font-bold text-gold">
                  ₹{currentTierData.totalLakhs} Lakhs
                </div>
                <p className="text-xs text-rose-blush font-light pt-1">
                  Covers venue rentals, accommodation room blocks, food catering, decor, photography, entertainment, planner fees, and taxes.
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2 text-xs text-rose-blush">
                <div className="flex justify-between">
                  <span>Base Subtotal</span>
                  <span className="font-semibold text-white">₹{(currentTierData.totalINR * 0.72 / 100000).toFixed(1)} Lakhs</span>
                </div>
                <div className="flex justify-between">
                  <span>GST Taxes (18%)</span>
                  <span className="font-semibold text-white">₹{(currentTierData.taxCost / 100000).toFixed(1)} Lakhs</span>
                </div>
                <div className="flex justify-between">
                  <span>Contingency Buffer (5%)</span>
                  <span className="font-semibold text-white">₹{(currentTierData.contingency / 100000).toFixed(1)} Lakhs</span>
                </div>
              </div>
            </div>

            {/* Horizontal Breakdown List (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gold/30 p-8 shadow-2xl space-y-4 text-xs">
              <h3 className="font-serif text-2xl font-bold text-wine border-b border-gold/20 pb-3">Itemized Expense Curation</h3>
              
              <div className="space-y-3">
                
                {/* Venue */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>Venue Daily Rentals</span>
                    <span className="text-wine">₹{(currentTierData.venueCost / 100000).toFixed(1)} Lakhs</span>
                  </div>
                  <div className="w-full bg-rose-blush/20 h-2 rounded-full overflow-hidden">
                    <div className="bg-wine h-full rounded-full" style={{ width: `${(currentTierData.venueCost / currentTierData.totalINR) * 100}%` }} />
                  </div>
                </div>

                {/* Rooms */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>Accommodation ({roomCount} Rooms)</span>
                    <span className="text-wine">₹{(currentTierData.roomCost / 100000).toFixed(1)} Lakhs</span>
                  </div>
                  <div className="w-full bg-rose-blush/20 h-2 rounded-full overflow-hidden">
                    <div className="bg-gold h-full rounded-full" style={{ width: `${(currentTierData.roomCost / currentTierData.totalINR) * 100}%` }} />
                  </div>
                </div>

                {/* Food */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>Food & Catering ({eventsCount} Ceremonies)</span>
                    <span className="text-wine">₹{(currentTierData.foodCost / 100000).toFixed(1)} Lakhs</span>
                  </div>
                  <div className="w-full bg-rose-blush/20 h-2 rounded-full overflow-hidden">
                    <div className="bg-wine-light h-full rounded-full" style={{ width: `${(currentTierData.foodCost / currentTierData.totalINR) * 100}%` }} />
                  </div>
                </div>

                {/* Decor */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>Floral Decor & Mandap Lighting</span>
                    <span className="text-wine">₹{(currentTierData.decorCost / 100000).toFixed(1)} Lakhs</span>
                  </div>
                  <div className="w-full bg-rose-blush/20 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-muted h-full rounded-full" style={{ width: `${(currentTierData.decorCost / currentTierData.totalINR) * 100}%` }} />
                  </div>
                </div>

                {/* Media & Entertainment */}
                <div className="space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>Photography, DJ & Entertainment</span>
                    <span className="text-wine">₹{((currentTierData.photoCost + currentTierData.entertainmentCost) / 100000).toFixed(1)} Lakhs</span>
                  </div>
                  <div className="w-full bg-rose-blush/20 h-2 rounded-full overflow-hidden">
                    <div className="bg-charcoal-muted h-full rounded-full" style={{ width: `${((currentTierData.photoCost + currentTierData.entertainmentCost) / currentTierData.totalINR) * 100}%` }} />
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* AI Optimization Suggestions */}
        {budgetData?.aiAdvice && (
          <div className="bg-white rounded-3xl border border-gold/30 p-8 shadow-2xl space-y-6">
            <div className="flex items-center space-x-2 text-wine font-serif font-bold text-2xl">
              <TrendingDown className="w-6 h-6 text-gold" />
              <span>AI Cost-Optimization Advice</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {budgetData.aiAdvice.savingOpportunities?.map((opp, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-background-cream border border-gold/20 space-y-2">
                  <div className="flex items-center justify-between font-bold text-wine">
                    <span>{opp.category}</span>
                    <span className="text-gold font-bold">{opp.potentialSaving}</span>
                  </div>
                  <p className="text-charcoal-muted leading-relaxed font-light">{opp.advice}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BudgetCalculatorPage;
