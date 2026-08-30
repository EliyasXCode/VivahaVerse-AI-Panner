import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, Download, Save, RefreshCw, Palette, Sun, MapPin, AlertCircle } from 'lucide-react';
import Loader from '../components/common/Loader';
import API from '../services/api';
import toast from 'react-hot-toast';

const DESTINATIONS = ["Udaipur", "Jaipur", "South Goa", "Kerala", "Jaisalmer", "Rishikesh", "Mussoorie", "Andaman"];
const EVENTS = ["Wedding Ceremony", "Haldi", "Mehendi", "Sangeet Gala", "Reception", "Cocktail Night", "Welcome Dinner"];
const STYLES = ["Royal", "Traditional", "Luxury", "Minimal", "Bohemian", "Pastel Floral", "Rajputana", "Beachfront", "Tropical"];
const TIMES = ["Golden Hour", "Sunset", "Night Starlight", "Daylight", "Sunrise"];
const PALETTES = ["Ivory & Antique Gold", "Pastel Pink & Mogra", "Maroon & Royal Gold", "White & Emerald Green", "Marigold Yellow & Orange"];

const VisualizerPage = () => {
  const [searchParams] = useSearchParams();

  const [destination, setDestination] = useState(searchParams.get('destination') || 'Udaipur');
  const [event, setEvent] = useState('Wedding Ceremony');
  const [style, setStyle] = useState('Royal');
  const [timeOfDay, setTimeOfDay] = useState('Golden Hour');
  const [colourPalette, setColourPalette] = useState('Ivory & Antique Gold');
  const [decorLevel, setDecorLevel] = useState('Luxury');

  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState("https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85");
  const [promptUsed, setPromptUsed] = useState("Photorealistic luxury Indian destination wedding mandap concept in Udaipur at Golden Hour.");

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/ai/generate-wedding-image', {
        destination,
        event,
        style,
        timeOfDay,
        colourPalette,
        decorLevel,
        guestCount: 150
      });

      if (res.data.success) {
        setResultImage(res.data.image);
        setPromptUsed(res.data.promptUsed);
        toast.success('AI Wedding Concept Visualization Generated!');
      }
    } catch (err) {
      toast.error('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `vivahaverse-${destination.toLowerCase()}-${event.toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Concept image downloaded');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 bg-rose-blush/30 text-wine px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Gemini 3.1 Flash Image Concept Engine</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-wine">
            See Your Wedding Before It Happens
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted font-light leading-relaxed">
            Synthesize high-end, photorealistic Indian destination wedding decor concept visualizations for any event, time of day, and color palette.
          </p>
          <div className="gold-divider w-24 mx-auto pt-2" />
        </div>

        {/* Main Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form (5 Cols) */}
          <form onSubmit={handleGenerate} className="lg:col-span-5 bg-white rounded-3xl border border-gold/30 p-6 sm:p-8 shadow-2xl space-y-5 text-xs">
            
            <h3 className="font-serif text-2xl font-bold text-wine border-b border-gold/20 pb-3">
              Concept Parameters
            </h3>

            {/* Destination */}
            <div>
              <label className="block font-semibold mb-1">Destination</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-3 rounded-xl border border-gold/30 bg-background-cream focus:outline-none"
              >
                {DESTINATIONS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Event Type */}
            <div>
              <label className="block font-semibold mb-1">Ceremony / Event</label>
              <select
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                className="w-full p-3 rounded-xl border border-gold/30 bg-background-cream focus:outline-none"
              >
                {EVENTS.map(ev => <option key={ev} value={ev}>{ev}</option>)}
              </select>
            </div>

            {/* Style */}
            <div>
              <label className="block font-semibold mb-1">Aesthetic Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full p-3 rounded-xl border border-gold/30 bg-background-cream focus:outline-none"
              >
                {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Time of Day */}
            <div>
              <label className="block font-semibold mb-1">Lighting & Time of Day</label>
              <select
                value={timeOfDay}
                onChange={(e) => setTimeOfDay(e.target.value)}
                className="w-full p-3 rounded-xl border border-gold/30 bg-background-cream focus:outline-none"
              >
                {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Colour Palette */}
            <div>
              <label className="block font-semibold mb-1">Floral & Decor Colour Theme</label>
              <select
                value={colourPalette}
                onChange={(e) => setColourPalette(e.target.value)}
                className="w-full p-3 rounded-xl border border-gold/30 bg-background-cream focus:outline-none"
              >
                {PALETTES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-wine hover:bg-wine-dark text-gold font-semibold text-xs uppercase tracking-wider py-4 rounded-full shadow-xl transition-all flex items-center justify-center space-x-2 pt-4"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span>{loading ? 'Generating Concept...' : 'Visualize My Wedding Concept'}</span>
            </button>

          </form>

          {/* Render Result Display (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-3xl border border-gold/30 p-4 shadow-2xl space-y-4">
              
              {loading ? (
                <div className="aspect-[4/3] rounded-2xl flex items-center justify-center bg-background-cream">
                  <Loader label="Imagining your celebration concept..." messages={["Combining architectural Mandap aesthetics...", "Applying floral lighting shaders...", "Rendering high-end editorial framing..."]} />
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-luxury border border-gold/20 group">
                  <img
                    src={resultImage}
                    alt="AI Wedding Concept Render"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine-dark/80 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="bg-gold text-wine text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full">
                        AI Concept Visualization
                      </span>
                      <span className="text-[10px] text-rose-blush">{destination} • {timeOfDay}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold">{event} — {style} Style</h3>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center space-x-2 text-xs">
                  <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="bg-rose-blush/30 hover:bg-rose-blush text-wine px-4 py-2 rounded-xl font-semibold flex items-center space-x-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Regenerate</span>
                  </button>

                  <button
                    onClick={handleDownload}
                    className="bg-background-cream hover:bg-gold hover:text-white border border-gold/30 text-charcoal px-4 py-2 rounded-xl font-semibold flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>

                <span className="text-[10px] text-charcoal-muted italic flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>AI generated concept art; actual venue decor may differ.</span>
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default VisualizerPage;
