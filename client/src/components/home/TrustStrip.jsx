import React from 'react';
import { Sparkles, MapPin, Building, ShieldCheck, Calculator } from 'lucide-react';

const STATS = [
  { icon: MapPin, value: "25+", label: "Indian Wedding Destinations" },
  { icon: Building, value: "100+", label: "Verified Luxury Venues" },
  { icon: Sparkles, value: "AI-Powered", label: "Grounded Planning Intelligence" },
  { icon: Calculator, value: "Indicative", label: "Deterministic Budget Engine" },
  { icon: ShieldCheck, value: "100%", label: "Bespoke Personalization" }
];

const TrustStrip = () => {
  return (
    <section className="bg-wine py-10 text-white border-y border-gold/30 relative overflow-hidden shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="space-y-1 p-2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold mb-1">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-gold tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] font-sans text-rose-blush/80 uppercase tracking-wider font-light">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
