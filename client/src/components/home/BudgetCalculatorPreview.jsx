import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, ArrowRight, CheckCircle2 } from 'lucide-react';

const BudgetCalculatorPreview = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-wine-dark text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-10 items-center border border-gold/30">
          
          <div className="space-y-6">
            <span className="text-gold text-xs uppercase tracking-widest font-semibold block">
              Transparent Pricing Intelligence
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Know Your Celebration Cost <br />
              <span className="text-gold italic font-normal">Before You Commit.</span>
            </h2>
            <p className="text-xs sm:text-sm text-rose-blush/80 font-light leading-relaxed">
              No hidden surcharges. Our deterministic cost engine calculates real estimates for venue hire, guest room blocks, catering per plate, decor, photography, and taxes.
            </p>

            <ul className="space-y-2.5 text-xs text-rose-blush">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Three scenarios: Essential, Premium & Royal Luxury</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span>AI Budget Optimization advice to save 15-20%</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Granular category breakdowns & taxes included</span>
              </li>
            </ul>

            <button
              onClick={() => navigate('/budget-calculator')}
              className="bg-gold hover:bg-white hover:text-wine text-white font-semibold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate My Wedding Budget</span>
            </button>
          </div>

          {/* Right Visual Card */}
          <div className="bg-white/10 backdrop-blur-md border border-gold/30 rounded-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-gold/20 pb-3">
              <div>
                <h4 className="font-serif font-bold text-lg text-white">Sample Budget Estimate</h4>
                <p className="text-[10px] text-rose-blush">Udaipur • 150 Guests • 3 Days</p>
              </div>
              <span className="bg-gold text-wine text-xs font-bold px-3 py-1 rounded-full">
                ₹48.5 Lakhs Total
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-rose-blush/80">Venue & Lawn Rentals</span>
                <span className="font-semibold text-white">₹10.5 Lakhs</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-rose-blush/80">Accommodation (75 Rooms, 3 Nights)</span>
                <span className="font-semibold text-white">₹14.2 Lakhs</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-rose-blush/80">Food & Catering (4 Ceremonies)</span>
                <span className="font-semibold text-white">₹9.8 Lakhs</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-rose-blush/80">Floral Decor & Lighting</span>
                <span className="font-semibold text-white">₹6.5 Lakhs</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-rose-blush/80">Media, Planner & Taxes</span>
                <span className="font-semibold text-white">₹7.5 Lakhs</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BudgetCalculatorPreview;
