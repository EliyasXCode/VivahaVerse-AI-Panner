import React, { useState, useEffect } from 'react';
import Hero from '../components/home/Hero';
import TrustStrip from '../components/home/TrustStrip';
import DestinationDiscovery from '../components/home/DestinationDiscovery';
import WhyAISection from '../components/home/WhyAISection';
import VisualizerTeaser from '../components/home/VisualizerTeaser';
import BudgetCalculatorPreview from '../components/home/BudgetCalculatorPreview';
import InspirationsSection from '../components/home/InspirationsSection';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';
import WeddingJournal from '../components/home/WeddingJournal';
import FinalCTA from '../components/home/FinalCTA';
import API from '../services/api';

const Home = ({ onOpenEnquiryModal }) => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await API.get('/destinations/featured');
        if (res.data.success) {
          setDestinations(res.data.destinations);
        }
      } catch (err) {
        console.warn('Failed to fetch destinations');
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <TrustStrip />
      <DestinationDiscovery destinations={destinations} />
      <WhyAISection />
      <VisualizerTeaser />
      <BudgetCalculatorPreview />
      <InspirationsSection />
      <HowItWorks />
      <Testimonials />
      <WeddingJournal />
      <FinalCTA onOpenEnquiryModal={onOpenEnquiryModal} />
    </div>
  );
};

export default Home;
