import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ChevronRight, ChevronLeft, Calendar, Users, Wallet, Heart, Sun } from 'lucide-react';
import Loader from '../components/common/Loader';
import API from '../services/api';
import toast from 'react-hot-toast';

const STYLES_LIST = [
  "Royal Palace", "Beach Resort", "Heritage Fort", "Mountain Retreat", 
  "Luxury Resort", "Forest Wilderness", "Lakeside Romance", "Desert Camp", "Minimal Modern"
];

const BUDGET_RANGES = [
  { label: "₹20–35 Lakhs", val: 30 },
  { label: "₹35–50 Lakhs", val: 45 },
  { label: "₹50–75 Lakhs", val: 65 },
  { label: "₹75 Lakhs – ₹1.2 Crores", val: 95 },
  { label: "₹1.2 Crores +", val: 150 }
];

const AIPlannerPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    partner1Name: '',
    partner2Name: '',
    weddingMonth: 'November',
    ceremonyType: 'Hindu',
    guestCount: 150,
    numberOfDays: 3,
    roomCount: 75,
    style: 'Royal Palace',
    budgetLakhs: 45,
    climatePreference: 'Lake',
    homeCityBride: 'Delhi',
    homeCityGroom: 'Mumbai',
    foodPreference: 'Vegetarian & Live Food Counters',
    events: ['Mehendi', 'Haldi', 'Sangeet', 'Wedding Ceremony', 'Reception']
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGeneratePlan = async () => {
    setLoading(true);
    try {
      const res = await API.post('/ai/wedding-plan', formData);
      if (res.data.success) {
        // Navigate to results page with plan state
        navigate('/ai-results', { state: { plan: res.data.plan, inputs: formData } });
      }
    } catch (err) {
      toast.error('Failed to generate AI wedding plan. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-rose-blush/30 text-wine px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Destination Recommender</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-wine">
            Design Your Unique Wedding Experience
          </h1>
          <p className="text-xs text-charcoal-muted font-light">
            Answer a few quick questions to let Google Gemini match grounded database destinations to your budget and style.
          </p>
          <div className="gold-divider w-24 mx-auto pt-2" />
        </div>

        {/* Wizard Container */}
        <div className="bg-white rounded-3xl border border-gold/30 p-6 sm:p-10 shadow-2xl space-y-6">
          
          {loading ? (
            <Loader label="Vivaha AI is Designing Your Celebration..." />
          ) : (
            <>
              {/* Progress Steps Header */}
              <div className="flex items-center justify-between text-xs border-b border-gold/20 pb-4">
                <span className="font-semibold text-charcoal-muted">Step {step} of 5</span>
                <span className="font-serif font-bold text-wine text-sm">
                  {step === 1 && "1. Couple & Date"}
                  {step === 2 && "2. Guest & Duration"}
                  {step === 3 && "3. Wedding Style"}
                  {step === 4 && "4. Target Budget"}
                  {step === 5 && "5. Climate & Curation"}
                </span>
              </div>

              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-4 text-xs animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-1">Bride's Name</label>
                      <input
                        type="text"
                        name="partner1Name"
                        value={formData.partner1Name}
                        onChange={handleChange}
                        placeholder="e.g. Ananya"
                        className="w-full p-3 rounded-xl border border-gold/30 bg-background-cream"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Groom's Name</label>
                      <input
                        type="text"
                        name="partner2Name"
                        value={formData.partner2Name}
                        onChange={handleChange}
                        placeholder="e.g. Kabir"
                        className="w-full p-3 rounded-xl border border-gold/30 bg-background-cream"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-1">Preferred Wedding Season / Month</label>
                      <select
                        name="weddingMonth"
                        value={formData.weddingMonth}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl border border-gold/30 bg-background-cream"
                      >
                        <option value="November">November (Peak Winter)</option>
                        <option value="December">December (Festive Winter)</option>
                        <option value="January">January (Crisp Winter)</option>
                        <option value="February">February (Spring Romance)</option>
                        <option value="March">March (Pleasant)</option>
                        <option value="April">April (Early Summer)</option>
                        <option value="October">October (Shoulder Season)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Ceremony Tradition</label>
                      <select
                        name="ceremonyType"
                        value={formData.ceremonyType}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl border border-gold/30 bg-background-cream"
                      >
                        <option value="Hindu">Hindu Royal Mandap</option>
                        <option value="Sikh">Sikh Anand Karaj</option>
                        <option value="Muslim">Muslim Nikah & Reception</option>
                        <option value="Christian">Christian Beach / Church Vows</option>
                        <option value="Interfaith">Interfaith Celebration</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-4 text-xs animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold mb-1">Total Guests</label>
                      <input
                        type="number"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl border border-gold/30 bg-background-cream"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Room Blocks Required</label>
                      <input
                        type="number"
                        name="roomCount"
                        value={formData.roomCount}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl border border-gold/30 bg-background-cream"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Number of Days</label>
                      <select
                        name="numberOfDays"
                        value={formData.numberOfDays}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl border border-gold/30 bg-background-cream"
                      >
                        <option value={2}>2 Days (Compact)</option>
                        <option value={3}>3 Days (Classic 4-Events)</option>
                        <option value={4}>4 Days (Extended Royal)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-4 text-xs animate-fadeIn">
                  <label className="block font-semibold">Select Primary Wedding Style</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {STYLES_LIST.map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setFormData({ ...formData, style: st })}
                        className={`p-3.5 rounded-xl border text-left font-semibold transition-all ${
                          formData.style === st
                            ? 'border-wine bg-wine text-white shadow-md'
                            : 'border-gold/30 bg-background-cream text-charcoal hover:border-gold'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div className="space-y-4 text-xs animate-fadeIn">
                  <label className="block font-semibold">Select Estimated Target Budget Tier</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BUDGET_RANGES.map((b) => (
                      <button
                        key={b.val}
                        type="button"
                        onClick={() => setFormData({ ...formData, budgetLakhs: b.val })}
                        className={`p-4 rounded-xl border text-left font-bold transition-all ${
                          formData.budgetLakhs === b.val
                            ? 'border-wine bg-wine text-white shadow-md'
                            : 'border-gold/30 bg-background-cream text-charcoal hover:border-gold'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5 */}
              {step === 5 && (
                <div className="space-y-4 text-xs animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-1">Climate Preference</label>
                      <select
                        name="climatePreference"
                        value={formData.climatePreference}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl border border-gold/30 bg-background-cream"
                      >
                        <option value="Lake">Lakeside Royalty (e.g. Udaipur, Kumarakom)</option>
                        <option value="Beach">Seaside Beachfront (e.g. South Goa, Kovalam, Andaman)</option>
                        <option value="Mountain">Cool Mountain Slopes (e.g. Mussoorie, Shimla, Manali)</option>
                        <option value="Desert">Desert Sandstone Forts (e.g. Jaisalmer, Jodhpur)</option>
                        <option value="Forest">Forest & Jungle Resorts (e.g. Jim Corbett, Coorg)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Catering & Food Curation</label>
                      <select
                        name="foodPreference"
                        value={formData.foodPreference}
                        onChange={handleChange}
                        className="w-full p-3 rounded-xl border border-gold/30 bg-background-cream"
                      >
                        <option value="Vegetarian & Live Food Counters">Strict Vegetarian & Regional Live Counters</option>
                        <option value="Jain Catering Priority">Specialized Jain Culinary Setup</option>
                        <option value="Multi-Cuisine Non-Veg & Seafood">Multi-Cuisine Non-Veg & Coastal Seafood</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Wizard Navigation Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-gold/20">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex items-center space-x-1 text-xs font-semibold text-charcoal hover:text-wine"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="bg-wine text-gold px-6 py-3 rounded-full text-xs font-semibold hover:bg-wine-dark flex items-center space-x-1"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleGeneratePlan}
                    className="bg-gold text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-wine shadow-xl flex items-center space-x-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Let AI Find My Destination</span>
                  </button>
                )}
              </div>

            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default AIPlannerPage;
