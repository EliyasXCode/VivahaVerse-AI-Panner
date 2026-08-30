import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSaved } from '../context/SavedContext';
import { Heart, Sparkles, CheckSquare, Plus, Trash2, Calendar, FileText, Image } from 'lucide-react';
import OptimizedImage from '../components/common/OptimizedImage';
import API from '../services/api';
import toast from 'react-hot-toast';

const DashboardPage = ({ onOpenAuthModal }) => {
  const { user, updateChecklist } = useAuth();
  const { favoriteDestinations, toggleFavoriteDestination } = useSaved();
  const [activeTab, setActiveTab] = useState('checklist'); // checklist, savedPlans, favorites

  const [savedPlans, setSavedPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [newChecklistTitle, setNewChecklistTitle] = useState('');

  useEffect(() => {
    if (user) {
      const fetchPlans = async () => {
        setLoadingPlans(true);
        try {
          const res = await API.get('/plans');
          if (res.data.success) {
            setSavedPlans(res.data.plans);
          }
        } catch (err) {
          console.warn('Failed to fetch user plans');
        } finally {
          setLoadingPlans(false);
        }
      };
      fetchPlans();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen pt-32 text-center bg-background-cream space-y-4 px-4">
        <Heart className="w-12 h-12 text-wine mx-auto" />
        <h2 className="font-serif text-3xl font-bold text-wine">Couples Wedding Dashboard</h2>
        <p className="text-xs text-charcoal-muted max-w-md mx-auto">
          Please sign in to view your saved AI wedding plans, favorite destinations, and interactive wedding checklist.
        </p>
        <button
          onClick={onOpenAuthModal}
          className="bg-wine text-gold px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-wine-dark"
        >
          Sign In / Create Account
        </button>
      </div>
    );
  }

  // Checklist Actions
  const handleToggleChecklist = (index) => {
    const updated = [...(user.checklist || [])];
    updated[index].completed = !updated[index].completed;
    updateChecklist(updated);
  };

  const handleAddChecklist = (e) => {
    e.preventDefault();
    if (!newChecklistTitle.trim()) return;
    const updated = [...(user.checklist || []), { title: newChecklistTitle, completed: false, category: 'Personal' }];
    updateChecklist(updated);
    setNewChecklistTitle('');
  };

  const handleDeleteChecklist = (index) => {
    const updated = (user.checklist || []).filter((_, i) => i !== index);
    updateChecklist(updated);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Banner */}
        <div className="bg-wine text-white rounded-3xl p-8 border border-gold/30 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-gold text-xs uppercase tracking-widest font-semibold block">Couples Portal</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold">Welcome, {user.name}!</h1>
            <p className="text-xs text-rose-blush font-light mt-1">Manage your wedding checklist, saved plans, and favorite destinations.</p>
          </div>
          
          <Link
            to="/ai-planner"
            className="bg-gold hover:bg-white hover:text-wine text-wine font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-md flex items-center space-x-1"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create New AI Plan</span>
          </Link>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex space-x-3 border-b border-gold/20 pb-2 text-xs">
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-5 py-2.5 rounded-full font-bold uppercase tracking-wider transition-all ${
              activeTab === 'checklist' ? 'bg-wine text-gold shadow-md' : 'bg-white text-charcoal border border-gold/30'
            }`}
          >
            Checklist ({user.checklist?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('savedPlans')}
            className={`px-5 py-2.5 rounded-full font-bold uppercase tracking-wider transition-all ${
              activeTab === 'savedPlans' ? 'bg-wine text-gold shadow-md' : 'bg-white text-charcoal border border-gold/30'
            }`}
          >
            Saved AI Plans ({savedPlans.length})
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-5 py-2.5 rounded-full font-bold uppercase tracking-wider transition-all ${
              activeTab === 'favorites' ? 'bg-wine text-gold shadow-md' : 'bg-white text-charcoal border border-gold/30'
            }`}
          >
            Favorites ({favoriteDestinations.length})
          </button>
        </div>

        {/* TAB 1: CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="bg-white rounded-3xl border border-gold/30 p-6 sm:p-8 shadow-2xl space-y-6 text-xs">
            <h3 className="font-serif text-2xl font-bold text-wine">Interactive Wedding Task Checklist</h3>
            
            {/* Add Item Form */}
            <form onSubmit={handleAddChecklist} className="flex gap-2">
              <input
                type="text"
                placeholder="Add custom task (e.g. Book mehendi artist, finalize invitations)..."
                value={newChecklistTitle}
                onChange={(e) => setNewChecklistTitle(e.target.value)}
                className="flex-1 p-3 rounded-xl border border-gold/30 bg-background-cream text-xs focus:outline-none focus:border-wine"
              />
              <button
                type="submit"
                className="bg-wine text-gold px-6 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-wine-dark flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            </form>

            {/* Tasks List */}
            <div className="space-y-2 pt-2">
              {user.checklist?.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between transition-colors ${
                    item.completed ? 'bg-rose-blush/20 border-rose-blush/40 line-through text-charcoal-muted' : 'bg-background-cream border-gold/20 text-wine font-semibold'
                  }`}
                >
                  <label className="flex items-center space-x-3 cursor-pointer flex-1">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleToggleChecklist(idx)}
                      className="w-4 h-4 text-wine rounded focus:ring-wine"
                    />
                    <span>{item.title}</span>
                  </label>
                  <button
                    onClick={() => handleDeleteChecklist(idx)}
                    className="text-rose-muted hover:text-red-600 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SAVED AI PLANS */}
        {activeTab === 'savedPlans' && (
          <div className="space-y-6 text-xs">
            {savedPlans.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gold/30 shadow-luxury space-y-3">
                <FileText className="w-12 h-12 text-gold mx-auto" />
                <h4 className="font-serif text-2xl font-bold text-wine">No Saved Plans Yet</h4>
                <p className="text-charcoal-muted">Use the AI Planner wizard to create and save custom wedding proposals.</p>
                <Link to="/ai-planner" className="bg-wine text-gold px-6 py-2.5 rounded-full inline-block font-bold">
                  Start AI Planner
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedPlans.map((plan) => (
                  <div key={plan._id} className="bg-white rounded-3xl border border-gold/30 p-6 shadow-luxury space-y-4">
                    <div className="flex justify-between items-start border-b border-gold/10 pb-3">
                      <div>
                        <h4 className="font-serif font-bold text-xl text-wine">{plan.title}</h4>
                        <p className="text-[11px] text-charcoal-muted">Budget: ₹{plan.budgetLakhs} Lakhs • Guests: {plan.guestCount}</p>
                      </div>
                      <span className="bg-gold text-wine text-[10px] uppercase font-bold px-2.5 py-1 rounded-full">
                        {plan.style}
                      </span>
                    </div>

                    <p className="text-charcoal-muted line-clamp-3">{plan.aiSummary}</p>

                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-wine">Top Pick: {plan.recommendedDestinationName}</span>
                      <span className="text-[10px] text-charcoal-muted">{new Date(plan.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: FAVORITES */}
        {activeTab === 'favorites' && (
          <div className="space-y-6 text-xs">
            {favoriteDestinations.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gold/30 shadow-luxury space-y-3">
                <Heart className="w-12 h-12 text-gold mx-auto" />
                <h4 className="font-serif text-2xl font-bold text-wine">No Favorite Destinations</h4>
                <p className="text-charcoal-muted">Click the heart icon on any destination card to save it here.</p>
                <Link to="/destinations" className="bg-wine text-gold px-6 py-2.5 rounded-full inline-block font-bold">
                  Explore Destinations
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {favoriteDestinations.map((dest) => (
                  <div key={dest._id || dest.slug} className="bg-white rounded-2xl border border-gold/20 overflow-hidden shadow-luxury p-4 space-y-3">
                    <h4 className="font-serif font-bold text-lg text-wine">{dest.name || 'Destination'}</h4>
                    <Link to={`/destinations/${dest.slug || dest.name.toLowerCase()}`} className="text-gold font-bold hover:underline block">
                      View Details &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default DashboardPage;
