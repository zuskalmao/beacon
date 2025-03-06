import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, BarChart3, Compass } from 'lucide-react';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-dark-light/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-colors duration-300 group"
    >
      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-white/70">{description}</p>
    </motion.div>
  );
};

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: <Zap size={24} className="text-primary" />,
      title: "Lightning Fast",
      description: "Built on Solana for blazing speed and minimal transaction costs, making micro-transactions viable.",
      delay: 0.1
    },
    {
      icon: <ShieldCheck size={24} className="text-primary" />,
      title: "Secure Protocol",
      description: "Leveraging Solana's robust security features to ensure your assets are protected at all times.",
      delay: 0.2
    },
    {
      icon: <BarChart3 size={24} className="text-primary" />,
      title: "Community Driven",
      description: "A vibrant community of builders, creators, and enthusiasts shaping the future together.",
      delay: 0.3
    },
    {
      icon: <Compass size={24} className="text-primary" />,
      title: "Beacon Navigator",
      description: "Our utility tool helps you navigate the blockchain with real-time visualizations and insights.",
      delay: 0.4
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-beacon/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-orbitron font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Illuminating the <span className="text-beacon">Blockchain</span> Path
          </motion.h2>
          
          <motion.p
            className="text-white/70 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Block Beacon ($BEACON) is a community-focused Solana token designed to guide and illuminate the path forward in the blockchain universe.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
        
        <div className="mt-20 md:mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl overflow-hidden bg-dark-light relative beacon-radar">
                <img 
                  src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Digital blockchain network" 
                  className="w-full h-full object-cover opacity-60 mix-blend-lighten"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-beacon/20 mix-blend-overlay"></div>
                
                {/* Animated beacon dots */}
                {Array.from({ length: 5 }).map((_, i) => {
                  const delay = i * 2;
                  const size = 30 + (i * 5);
                  
                  return (
                    <div 
                      key={i}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-beacon/50"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        animation: `ping-slow ${3 + i * 0.5}s cubic-bezier(0, 0, 0.2, 1) infinite ${delay}s`
                      }}
                    ></div>
                  );
                })}
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-beacon animate-pulse z-10"></div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl md:text-3xl font-orbitron font-bold mb-6">The <span className="text-beacon">Guiding Light</span> in Crypto</h3>
              
              <p className="text-white/70 mb-6">
                Just as lighthouses guide ships safely to harbor, Block Beacon illuminates the path through the complex world of blockchain technology. Our mission is to create a vibrant community-driven ecosystem that provides real utility to token holders.
              </p>
              
              <p className="text-white/70 mb-6">
                With the Beacon Navigator utility, token holders can track, analyze, and visualize blockchain activity in real-time, gaining invaluable insights into network health, transaction patterns, and emerging trends.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-dark-light/50 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                  <h4 className="font-orbitron font-semibold text-primary mb-2">Solana Powered</h4>
                  <p className="text-sm text-white/70">Built on one of the fastest and most efficient blockchain networks</p>
                </div>
                
                <div className="bg-dark-light/50 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                  <h4 className="font-orbitron font-semibold text-beacon mb-2">Community First</h4>
                  <p className="text-sm text-white/70">Governed by our community, for our community</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
