import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const DEFAULT_MESSAGES = [
  "Finding extraordinary wedding destinations...",
  "Understanding your luxury wedding style...",
  "Balancing guest count & indicative venue budgets...",
  "Designing your personalized 3-day itinerary...",
  "Synthesizing recommendations with database intelligence..."
];

const Loader = ({ messages = DEFAULT_MESSAGES, label = "AI Planning in Progress" }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!messages || messages.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-6">
      
      {/* Animated Floral Gold Ring */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 border-2 border-gold/30 rounded-full animate-ping"></div>
        <div className="absolute inset-2 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
        <div className="w-12 h-12 rounded-full bg-wine text-gold flex items-center justify-center shadow-gold-glow">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-serif text-2xl font-bold text-wine tracking-wide">{label}</h4>
        <p className="text-xs font-sans text-charcoal-muted transition-all duration-500 h-6 min-w-[280px]">
          {messages[index]}
        </p>
      </div>

      <div className="flex justify-center space-x-1.5 pt-2">
        {messages.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? 'w-6 bg-gold' : 'w-1.5 bg-gold/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
