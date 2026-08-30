import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import OptimizedImage from '../components/common/OptimizedImage';

const CATEGORIES = ["All", "Royal", "Beach", "Pastel", "Mountain", "Traditional", "Minimal", "Luxury"];

const STORIES = [
  {
    title: "Ananya & Kabir’s Lake Palace Vows",
    destination: "Udaipur",
    style: "Royal",
    heroImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85",
    theme: "Antique Gold & Mogra Mandap",
    story: "Set against the sparkling waters of Lake Pichola, Ananya and Kabir exchanged vows under an antique gold mandap dripping in fresh white mogra and blush garden roses."
  },
  {
    title: "Tara & Rohan’s Sunset Beach Celebration",
    destination: "South Goa",
    style: "Beach",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=85",
    theme: "Pampas Grass & Ivory Mandap",
    story: "Barefoot in the sand at sunset, surrounded by lush pampas grass, white orchids, and ocean breezes."
  },
  {
    title: "Rhea & Siddharth’s Desert Fort Extravaganza",
    destination: "Jaisalmer",
    style: "Traditional",
    heroImage: "https://images.unsplash.com/photo-1572445271230-a78b5944a659?auto=format&fit=crop&w=1200&q=85",
    theme: "Sandstone Ramparts & Fire Dancers",
    story: "Celebrated over 3 days under starry desert skies with Manganiyar folk performances and candlelit courtyard banquets."
  }
];

const InspirationsPage = () => {
  const [activeCat, setActiveCat] = useState("All");

  const filtered = activeCat === "All" ? STORIES : STORIES.filter(s => s.style === activeCat);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-gold block">
            Real Celebrations & Conceptual Moodboards
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-wine">
            Inspirational Wedding Stories
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted font-light leading-relaxed">
            Browse through curated photography, floral palettes, and real destination wedding concepts across India.
          </p>
          <div className="gold-divider w-24 mx-auto pt-2" />
        </div>

        {/* Filter Categories Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-5 py-2 rounded-full font-semibold transition-all ${
                activeCat === cat
                  ? 'bg-wine text-gold shadow-md'
                  : 'bg-white text-charcoal border border-gold/30 hover:border-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Story Cards Masonry */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((story, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-gold/30 overflow-hidden shadow-luxury hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <OptimizedImage src={story.heroImage} alt={story.title} aspectRatio="aspect-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="bg-gold text-wine text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full">
                    {story.destination}
                  </span>
                  <h3 className="font-serif text-xl font-bold mt-1">{story.title}</h3>
                </div>
              </div>

              <div className="p-6 space-y-3 text-xs">
                <p className="font-bold text-wine">{story.theme}</p>
                <p className="text-charcoal-muted leading-relaxed font-light">{story.story}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default InspirationsPage;
