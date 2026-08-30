import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Eye, Palette, Clock, Sun } from 'lucide-react';
import OptimizedImage from '../common/OptimizedImage';

const VisualizerTeaser = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background-warm relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl border border-gold/30 p-8 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Text & Controls */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-rose-blush/30 text-wine px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Wedding Visualizer</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-wine leading-tight">
              See Your Wedding <br />
              <span className="text-gold italic font-normal">Before It Happens.</span>
            </h2>

            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-light">
              Want to see how an Ivory & Gold mandap looks at golden hour in Udaipur vs a sunset beach mandap in Goa? Our Gemini Image concept engine generates photorealistic wedding visualizations.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3 rounded-xl bg-background-cream border border-gold/20 flex items-center space-x-2">
                <Palette className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Custom Color Palettes</span>
              </div>
              <div className="p-3 rounded-xl bg-background-cream border border-gold/20 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Golden Hour & Night</span>
              </div>
              <div className="p-3 rounded-xl bg-background-cream border border-gold/20 flex items-center space-x-2">
                <Sun className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Haldi, Sangeet & Mandap</span>
              </div>
              <div className="p-3 rounded-xl bg-background-cream border border-gold/20 flex items-center space-x-2">
                <Eye className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Instant Concept Render</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/visualizer')}
              className="bg-wine hover:bg-wine-dark text-gold font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch AI Visualizer Studio</span>
            </button>
          </div>

          {/* Right Image Display */}
          <div className="relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <OptimizedImage
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85"
                alt="AI Wedding Concept Rendering"
                aspectRatio="aspect-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white z-10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="bg-gold text-wine text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full">
                    AI Concept Render
                  </span>
                  <span className="text-[10px] text-rose-blush">Udaipur • Golden Hour</span>
                </div>
                <p className="font-serif text-lg font-bold">Lakeside Royal Palace Sunset Mandap</p>
              </div>
            </div>
            {/* Disclaimer pill */}
            <p className="text-[10px] text-charcoal-muted text-center pt-2 italic">
              AI Concept Visualization – actual venue appearance may vary.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default VisualizerTeaser;
