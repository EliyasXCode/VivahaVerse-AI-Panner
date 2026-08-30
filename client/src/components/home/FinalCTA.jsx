import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const FinalCTA = ({ onOpenEnquiryModal }) => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-wine text-white text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        
        <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold flex items-center justify-center text-gold mx-auto shadow-gold-glow">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight">
          Your Dream Destination. <br />
          <span className="text-gold italic font-normal">Designed by Intelligence.</span>
        </h2>

        <p className="text-xs sm:text-sm text-rose-blush/90 max-w-xl mx-auto font-light leading-relaxed">
          Let AI find your perfect destination, calculate indicative budgets, and generate photorealistic wedding concepts today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/ai-planner')}
            className="w-full sm:w-auto bg-gold hover:bg-white hover:text-wine text-white font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-rose-blush" />
            <span>Start AI Wedding Planner</span>
          </button>
          
          <button
            onClick={onOpenEnquiryModal}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full border border-gold/40 transition-all flex items-center justify-center space-x-2"
          >
            <span>Submit Direct Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default FinalCTA;
