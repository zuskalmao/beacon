import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import BeaconAnimation from './BeaconAnimation';

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const generateStars = () => {
      if (!containerRef.current) return;
      
      containerRef.current.innerHTML = '';
      
      const starCount = 100;
      const container = containerRef.current;
      const { width, height } = container.getBoundingClientRect();
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.borderRadius = '50%';
        star.style.backgroundColor = 'white';
        star.style.position = 'absolute';
        star.style.left = `${Math.random() * width}px`;
        star.style.top = `${Math.random() * height}px`;
        star.style.opacity = `${Math.random() * 0.8 + 0.2}`;
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite alternate`;
        
        container.appendChild(star);
      }
    };
    
    generateStars();
    window.addEventListener('resize', generateStars);
    
    return () => {
      window.removeEventListener('resize', generateStars);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center py-20 overflow-hidden hero-section">
      <div ref={containerRef} className="absolute inset-0 z-0 stars-container"></div>
      
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-dark/10 via-dark to-dark"></div>
      
      <div className="container mx-auto px-4 pt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 bg-primary/20 px-3 py-1 rounded-full border border-primary/30">
              <Sparkles size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Now on Solana Blockchain</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-4 leading-tight">
              <span className="text-primary text-glow">BLOCK</span> <br />
              <span className="text-beacon text-beacon">BEACON</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
              Guiding the way through the blockchain universe. Block Beacon illuminates the path to a brighter future in the Solana ecosystem.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <motion.a
                href="#utility"
                className="bg-primary hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 px-6 py-3 rounded-full text-white font-semibold flex items-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Beacon Navigator
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="#about"
                className="bg-transparent hover:bg-dark-light border border-primary/50 px-6 py-3 rounded-full text-white/90 font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.a>
            </div>
            
            <div className="mt-8 flex items-center gap-4">
              <div className="pulse-rings relative w-6 h-6">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="w-4 h-4 rounded-full bg-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <p className="text-sm text-white/70">Built on Solana for blazing speed and efficiency</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:block relative h-[500px]"
          >
            <BeaconAnimation />
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <a 
            href="#about" 
            className="flex flex-col items-center text-white/50 hover:text-white transition-colors duration-300"
          >
            <span className="text-sm font-medium mb-2">Scroll to discover</span>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
