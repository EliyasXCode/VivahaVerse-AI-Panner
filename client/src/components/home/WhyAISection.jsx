import React from 'react';
import { Sparkles, Brain, Calculator, Image, Calendar, Scale, Bot } from 'lucide-react';

const AI_FEATURES = [
  {
    icon: Brain,
    title: "Smart Destination Matching",
    description: "Database-grounded algorithms rank 25+ Indian wedding destinations based on your budget, guest count, ceremony style, and weather."
  },
  {
    icon: Calculator,
    title: "AI Budget Optimization",
    description: "Generates tier breakdowns (Essential, Premium, Luxury) and suggests actionable ways to optimize expenses without ruining experience."
  },
  {
    icon: Image,
    title: "Wedding Visualizer",
    description: "Powered by Gemini 3.1 Flash Image to synthesize photorealistic concept art for Haldi, Mehendi, Sangeet, Wedding, and Receptions."
  },
  {
    icon: Calendar,
    title: "Personalized Itineraries",
    description: "Creates detailed 2, 3, or 4-day event schedules tailored to cultural traditions, guest check-ins, and ceremony timings."
  },
  {
    icon: Scale,
    title: "Venue Compare Matrix",
    description: "Side-by-side comparative analysis of up to 3 luxury properties with AI syntheses explaining advantages and considerations."
  },
  {
    icon: Bot,
    title: "24/7 AI Concierge",
    description: "Floating assistant capable of answering natural language queries like 'Udaipur or Jaipur for 150 guests under 40 Lakhs?'"
  }
];

const WhyAISection = () => {
  return (
    <section className="py-20 bg-wine text-white relative overflow-hidden">
      
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-blush/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 bg-gold/20 text-gold px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generative AI Engineering</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Why AI Makes Planning Easier
          </h2>
          <p className="text-xs sm:text-sm text-rose-blush/90 font-light leading-relaxed">
            Unlike static travel booking portals, VivahaVerse AI combines verified Indian venue datasets with Google Gemini models to deliver intelligent, realistic wedding planning.
          </p>
          <div className="gold-divider w-24 mx-auto pt-2" />
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-wine-dark/60 backdrop-blur-md border border-gold/30 p-6 rounded-2xl space-y-4 hover:border-gold transition-all duration-300 hover:-translate-y-1 shadow-luxury"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white">
                  {feat.title}
                </h3>
                <p className="text-xs text-rose-blush/80 leading-relaxed font-light">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyAISection;
