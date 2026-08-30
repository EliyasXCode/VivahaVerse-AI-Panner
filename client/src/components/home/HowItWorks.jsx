import React from 'react';
import { Compass, Sparkles, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    step: "01",
    title: "Share Your Vision",
    description: "Tell AI your preferred style (Royal, Beach, Heritage, Mountain), target budget, guest count, and ceremony dates."
  },
  {
    step: "02",
    title: "AI Matches & Ranks Destinations",
    description: "Our algorithm queries grounded database metrics to match top destinations, providing cost estimates and venue options."
  },
  {
    step: "03",
    title: "Visualize & Finalize",
    description: "Generate photorealistic AI mandap & event concepts, compute budgets, and submit inquiries directly to venue architects."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-background text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold block">
            Effortless 3-Step Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-wine">
            How VivahaVerse AI Works
          </h2>
          <div className="gold-divider w-24 mx-auto pt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((item, idx) => (
            <div
              key={idx}
              className="bg-background-cream p-8 rounded-2xl border border-gold/30 relative shadow-luxury space-y-4 hover:border-gold transition-all"
            >
              <div className="text-4xl font-serif font-bold text-gold/40">
                {item.step}
              </div>
              <h3 className="font-serif text-2xl font-bold text-wine">
                {item.title}
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
