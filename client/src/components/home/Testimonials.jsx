import React from 'react';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    couple: "Devanshi & Vikram",
    location: "Udaipur Celebration",
    quote: "VivahaVerse AI accurately estimated our 180-guest palace wedding budget down to the exact tier. The AI concierge suggested shoulder dates in early October that saved us ₹8 Lakhs on room tariffs!"
  },
  {
    couple: "Natasha & Armaan",
    location: "South Goa Wedding",
    quote: "The AI Concept Visualizer gave us total clarity on how an ivory & blush mandap would look at Taj Exotica sunset. Seeing the visual concept before booking made our decision seamless."
  },
  {
    couple: "Pooja & Sameer",
    location: "Rishikesh Riverside",
    quote: "We were torn between Mussoorie and Rishikesh. The venue compare tool gave us side-by-side weather and airport distance comparisons that won over both our families."
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-wine-dark text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold block">
            Couple Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Loved by Couples Nationwide
          </h2>
          <div className="gold-divider w-24 mx-auto pt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md border border-gold/30 p-6 rounded-2xl space-y-4 shadow-2xl relative"
            >
              <Quote className="w-8 h-8 text-gold/30" />
              <p className="text-xs text-rose-blush leading-relaxed italic font-light">
                "{rev.quote}"
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-serif font-bold text-white text-base">{rev.couple}</h4>
                  <p className="text-[10px] text-gold">{rev.location}</p>
                </div>
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
