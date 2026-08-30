import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';
import { SavedProvider } from './context/SavedContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AIChatConcierge from './components/ai/AIChatConcierge';
import EnquiryModalWizard from './components/inquiry/EnquiryModalWizard';
import AuthModal from './components/common/AuthModal';

import Home from './pages/Home';
import DestinationsPage from './pages/DestinationsPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import VenuesPage from './pages/VenuesPage';
import VenueDetailPage from './pages/VenueDetailPage';
import VenueComparePage from './pages/VenueComparePage';
import AIPlannerPage from './pages/AIPlannerPage';
import AIResultsPage from './pages/AIResultsPage';
import VisualizerPage from './pages/VisualizerPage';
import BudgetCalculatorPage from './pages/BudgetCalculatorPage';
import InspirationsPage from './pages/InspirationsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <AuthProvider>
      <SavedProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-background text-charcoal">
            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

            <Navbar
              onOpenEnquiryModal={() => setEnquiryModalOpen(true)}
              onOpenAuthModal={() => setAuthModalOpen(true)}
            />

            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home onOpenEnquiryModal={() => setEnquiryModalOpen(true)} />} />
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/destinations/:slug" element={<DestinationDetailPage onOpenEnquiryModal={() => setEnquiryModalOpen(true)} />} />
                <Route path="/venues" element={<VenuesPage />} />
                <Route path="/venues/:slug" element={<VenueDetailPage onOpenEnquiryModal={() => setEnquiryModalOpen(true)} />} />
                <Route path="/compare-venues" element={<VenueComparePage />} />
                <Route path="/ai-planner" element={<AIPlannerPage />} />
                <Route path="/ai-results" element={<AIResultsPage />} />
                <Route path="/visualizer" element={<VisualizerPage />} />
                <Route path="/budget-calculator" element={<BudgetCalculatorPage />} />
                <Route path="/inspirations" element={<InspirationsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/dashboard" element={<DashboardPage onOpenAuthModal={() => setAuthModalOpen(true)} />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            <AIChatConcierge />

            <EnquiryModalWizard
              isOpen={enquiryModalOpen}
              onClose={() => setEnquiryModalOpen(false)}
            />

            <AuthModal
              isOpen={authModalOpen}
              onClose={() => setAuthModalOpen(false)}
            />

            <Footer />
          </div>
        </Router>
      </SavedProvider>
    </AuthProvider>
  );
}

export default App;
