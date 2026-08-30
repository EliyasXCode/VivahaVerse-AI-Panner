import React from 'react';
import { Sparkles, ShieldCheck, Heart, Award } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-background-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold block">
            Brand Identity & Philosophy
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-wine">
            Your Dream Destination. Designed by Intelligence.
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted font-light leading-relaxed max-w-2xl mx-auto">
            VivahaVerse AI is a luxury destination wedding planning platform designed to eliminate ambiguity in Indian wedding planning through database grounding and Generative AI.
          </p>
          <div className="gold-divider w-24 mx-auto pt-2" />
        </div>

        <div className="bg-white rounded-3xl border border-gold/30 p-8 sm:p-12 shadow-2xl space-y-6 text-xs text-charcoal-muted leading-relaxed font-light">
          <h3 className="font-serif text-2xl font-bold text-wine">Reimagining Indian Destination Weddings</h3>
          <p>
            Planning a destination wedding in India has historically been fraught with fragmented information, unverified pricing estimates, and endless back-and-forth venue negotiations.
          </p>
          <p>
            VivahaVerse AI bridges this gap. By combining real venue database parameters with Google Gemini models, we enable couples to explore verified destination metrics, calculate deterministic budgets, and synthesize photorealistic AI concept visuals before booking a single flight.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-center">
            <div className="p-4 rounded-2xl bg-background-cream border border-gold/20 space-y-2">
              <ShieldCheck className="w-6 h-6 text-gold mx-auto" />
              <h4 className="font-serif font-bold text-wine text-base">Verified DB Grounding</h4>
              <p className="text-[11px]">Real venue tariffs, capacity bounds, and airport distances.</p>
            </div>
            <div className="p-4 rounded-2xl bg-background-cream border border-gold/20 space-y-2">
              <Sparkles className="w-6 h-6 text-gold mx-auto" />
              <h4 className="font-serif font-bold text-wine text-base">AI Visualizer Studio</h4>
              <p className="text-[11px]">Photorealistic concept art for Haldi, Sangeet & Mandaps.</p>
            </div>
            <div className="p-4 rounded-2xl bg-background-cream border border-gold/20 space-y-2">
              <Heart className="w-6 h-6 text-gold mx-auto" />
              <h4 className="font-serif font-bold text-wine text-base">100% Bespoke</h4>
              <p className="text-[11px]">Personalized 3-day itineraries tailored to cultural traditions.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
