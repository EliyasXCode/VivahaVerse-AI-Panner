import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import OptimizedImage from '../common/OptimizedImage';

const ARTICLES = [
  {
    title: "10 Most Regal Palace Venues in Udaipur for 2026",
    category: "Palace Guide",
    date: "August 2026",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
    snippet: "From floating marble palaces to private lake jeties, explore Udaipur's top wedding properties."
  },
  {
    title: "How to Plan a Beach Wedding in Goa Under ₹35 Lakhs",
    category: "Budget Curation",
    date: "July 2026",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    snippet: "Smart strategies for guest room blocking, seasonal dates, and local floral decor."
  },
  {
    title: "The Rise of Sacred Riverside Weddings in Rishikesh",
    category: "Destination Trends",
    date: "August 2026",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    snippet: "Why eco-conscious couples are choosing Ganga riverside resorts for intimate vows."
  }
];

const WeddingJournal = () => {
  return (
    <section className="py-20 bg-background-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold block">
            Editorial Curation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-wine">
            The Wedding Journal
          </h2>
          <div className="gold-divider w-24 mx-auto pt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((art, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gold/20 overflow-hidden shadow-luxury space-y-4 hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <OptimizedImage src={art.image} alt={art.title} aspectRatio="aspect-full" />
              </div>
              <div className="p-5 space-y-3 text-xs">
                <div className="flex items-center justify-between text-charcoal-muted">
                  <span className="bg-rose-blush/30 text-wine px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    {art.category}
                  </span>
                  <span>{art.date}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-wine leading-tight hover:text-gold transition-colors">
                  {art.title}
                </h3>
                <p className="text-charcoal-muted font-light leading-relaxed">
                  {art.snippet}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WeddingJournal;
