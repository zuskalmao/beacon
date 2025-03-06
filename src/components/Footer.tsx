import React from 'react';
import { Lightbulb, Twitter, Github, MessageCircle, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-light/50 backdrop-blur-md border-t border-primary/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <Lightbulb size={24} className="text-beacon" />
              <span className="font-orbitron font-bold text-lg text-primary">BLOCK <span className="text-beacon">BEACON</span></span>
            </a>
            
            <p className="text-white/70 mb-6">
              Illuminating the blockchain path on Solana with powerful utility and community focus.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-dark flex items-center justify-center text-white/70  hover:text-primary hover:bg-primary/10 transition-colors duration-200"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-dark flex items-center justify-center text-white/70 hover:text-primary hover:bg-primary/10 transition-colors duration-200"
              >
                <Github size={18} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-dark flex items-center justify-center text-white/70 hover:text-primary hover:bg-primary/10 transition-colors duration-200"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-orbitron font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Beacon Navigator', 'Game', 'Community'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-white/70 hover:text-primary transition-colors duration-200 block py-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-orbitron font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {[
                { name: 'Documentation', url: '#' },
                { name: 'Developer Hub', url: '#' },
                { name: 'Solana Blockchain', url: 'https://solana.com' },
                { name: 'Community Forum', url: '#' },
                { name: 'FAQs', url: '#' }
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.url} 
                    target={item.url.startsWith('http') ? '_blank' : '_self'}
                    rel={item.url.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="text-white/70 hover:text-primary transition-colors duration-200 block py-1 flex items-center"
                  >
                    {item.name}
                    {item.url.startsWith('http') && <ExternalLink size={14} className="ml-1 inline-block" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-orbitron font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {[
                'Terms of Service',
                'Privacy Policy',
                'Disclaimer',
                'Cookie Policy'
              ].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-white/70 hover:text-primary transition-colors duration-200 block py-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Block Beacon. All rights reserved.
          </p>
          
          <p className="text-white/50 text-sm mt-2 md:mt-0">
            $BEACON is not an investment. No promises of future performance.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
