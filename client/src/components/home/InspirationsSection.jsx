import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import OptimizedImage from '../common/OptimizedImage';

const INSPIRATION_STORIES = [
  {
    couple: "Ananya & Kabir",
    destination: "Udaipur",
    venue: "Leela Palace",
    style: "Royal Sunset Lake Vows",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85",
    theme: "Antique Gold & Mogra"
  },
  {
    couple: "Tara & Rohan",
    destination: "South Goa",
    venue: "Taj Exotica",
    style: "Seaside Bohemian Sunset",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
    theme: "Tropical Ivory & Sand"
  },
  {
    couple: "Siddharth & Rhea",
    destination: "Jaisalmer",
    venue: "Suryagarh Fort",
    style: "Golden Fort & Starry Night",
    image: "https://images.unsplash.com/photo-1572445271230-a78b5944a659?auto=format&fit=crop&w=1200&q=85",
    theme: "Sandstone & Fire Dancers"
  }
];

const InspirationsSection = () => {
  return (
    <section className="py-20 bg-background-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold block">
            Love Stories Across India
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-wine">
            Real Wedding Inspirations
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted font-light leading-relaxed">
            Immerse yourself in conceptual moodboards and real wedding stories designed at India's most iconic destinations.
          </p>
          <div className="gold-divider w-24 mx-auto pt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INSPIRATION_STORIES.map((story, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl border border-gold/20 overflow-hidden shadow-luxury hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <OptimizedImage
                  src={story.image}
                  alt={story.couple}
                  aspectRatio="aspect-full"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="bg-gold text-wine text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                    {story.destination}
                  </span>
                  <h3 className="font-serif text-xl font-bold mt-1">{story.couple}</h3>
                </div>
              </div>

              <div className="p-5 space-y-3 text-xs">
                <div className="flex justify-between text-charcoal-muted border-b border-gold/10 pb-2">
                  <span>Venue: <strong className="text-wine">{story.venue}</strong></span>
                  <span>{story.theme}</span>
                </div>
                <p className="text-charcoal-muted italic">"{story.style}"</p>
                <Link
                  to="/inspirations"
                  className="inline-flex items-center space-x-1 text-wine font-semibold hover:text-gold transition-colors pt-1"
                >
                  <span>View Story Moodboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InspirationsSection;
