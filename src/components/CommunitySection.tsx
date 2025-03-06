import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Rocket, ArrowRight } from 'lucide-react';

const CommunitySection: React.FC = () => {
  return (
    <section id="community" className="py-24 relative overflow-hidden">
      <div className="absolute -bottom-60 -left-60 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-orbitron font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Join Our <span className="text-primary">Community</span>
          </motion.h2>
          
          <motion.p
            className="text-white/70 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Become part of a growing community of blockchain enthusiasts, developers, and innovators who are passionate about the future of Solana.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-dark-light/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10"
          >
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Users size={28} className="text-primary" />
            </div>
            
            <h3 className="text-xl font-orbitron font-semibold mb-3 text-white">Community Forum</h3>
            
            <p className="text-white/70 mb-6">
              Join discussions, share ideas, and collaborate with fellow $BEACON holders in our community forums.
            </p>
            
            <a 
              href="#"
              className="text-primary font-medium flex items-center gap-2 group"
            >
              Join Forum
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-dark-light/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10"
          >
            <div className="w-14 h-14 rounded-full bg-beacon/20 flex items-center justify-center mb-4">
              <MessageCircle size={28} className="text-beacon" />
            </div>
            
            <h3 className="text-xl font-orbitron font-semibold mb-3 text-white">Discord Community</h3>
            
            <p className="text-white/70 mb-6">
              Chat in real-time, get support, and participate in exclusive events with our vibrant Discord community.
            </p>
            
            <a 
              href="#"
              className="text-beacon font-medium flex items-center gap-2 group"
            >
              Join Discord
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-dark-light/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10"
          >
            <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
              <Rocket size={28} className="text-secondary" />
            </div>
            
            <h3 className="text-xl font-orbitron font-semibold mb-3 text-white">Developer Hub</h3>
            
            <p className="text-white/70 mb-6">
              Access resources, documentation, and tools to build on top of the $BEACON ecosystem and contribute to our growth.
            </p>
            
            <a 
              href="#"
              className="text-secondary font-medium flex items-center gap-2 group"
            >
              Explore Hub
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
        
        <div className="mt-20">
          <div className="bg-gradient-to-r from-primary/20 via-beacon/20 to-secondary/20 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-2xl md:text-3xl font-orbitron font-bold mb-4"
                >
                  Be Part of Our <span className="text-beacon">Journey</span>
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-white/80 mb-6"
                >
                  The Block Beacon project is community-focused and driven by passionate blockchain enthusiasts. Join us as we develop innovative solutions for the Solana ecosystem.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-4"
                >
                  {[
                    "Access to Beacon Navigator utility",
                    "Community governance rights",
                    "Early access to new features",
                    "Exclusive community events"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-beacon/20 flex items-center justify-center mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-beacon">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-white/80">{benefit}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="bg-dark/60 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h4 className="font-orbitron font-semibold text-xl mb-4 text-white">Stay Updated</h4>
                  
                  <p className="text-white/70 mb-4">
                    Subscribe to our newsletter to receive the latest updates, announcements, and exclusive content.
                  </p>
                  
                  <form className="space-y-4">
                    <div>
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full bg-dark border border-primary/20 rounded-lg py-3 px-4 text-white/90 focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 rounded-lg transition-colors duration-300"
                    >
                      Subscribe
                    </button>
                  </form>
                  
                  <p className="text-white/50 text-sm mt-4">
                    We respect your privacy and will never share your information.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
