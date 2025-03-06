import React, { useState, useEffect } from 'react';
import { Lightbulb, Menu, X, Github, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Beacon Navigator', href: '#utility' },
    { label: 'Game', href: '#game' },
    { label: 'Community', href: '#community' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark/80 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.a 
          href="#home"
          className="flex items-center gap-2 font-orbitron text-xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Lightbulb size={30} className="text-beacon animate-pulse-slow" />
          <span className="text-primary">BLOCK <span className="text-beacon">BEACON</span></span>
        </motion.a>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="text-white/90 hover:text-beacon transition-colors duration-300 font-medium"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <motion.a
            href="https://twitter.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-primary transition-colors duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Twitter size={20} />
          </motion.a>
          <motion.a
            href="https://github.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-primary transition-colors duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Github size={20} />
          </motion.a>
          <motion.a
            href="#community"
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full shadow-lg hover:shadow-primary/30 transition-all duration-300 font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            Join Community
          </motion.a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden fixed top-[60px] left-0 right-0 bg-dark-light shadow-lg backdrop-blur-md z-40"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white/90 hover:text-beacon py-2 transition-colors duration-300 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center space-x-4 pt-2">
                <a
                  href="https://twitter.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-primary transition-colors duration-300"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="https://github.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-primary transition-colors duration-300"
                >
                  <Github size={20} />
                </a>
              </div>
              <a
                href="#community"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full shadow-lg hover:shadow-primary/30 transition-all duration-300 font-medium inline-block w-fit mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Community
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
