import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import BeaconNavigator from './components/BeaconNavigator';
import BeaconGame from './components/BeaconGame';
import CommunitySection from './components/CommunitySection';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className="fixed inset-0 bg-dark flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto flex items-center justify-center mb-6 animate-pulse-slow">
            <div className="w-12 h-12 rounded-full bg-beacon flex items-center justify-center animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1 9 9 0 0 0-9-9Z" />
                <path d="M7 12a5 5 0 0 1 5-5" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-orbitron font-bold text-primary mb-2">
            BLOCK <span className="text-beacon">BEACON</span>
          </h2>
          <p className="text-white/70">Illuminating the blockchain...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <BeaconNavigator />
        <BeaconGame />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
