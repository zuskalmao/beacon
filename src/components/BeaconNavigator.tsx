import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Clock, Filter, RefreshCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { BlockData, BeaconSignal } from '../types';
import { generateMockData } from '../utils/mockData';

const BeaconNavigator: React.FC = () => {
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [signals, setSignals] = useState<BeaconSignal[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<BlockData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const radarRef = useRef<HTMLDivElement>(null);
  
  // Initialize with mock data
  useEffect(() => {
    const { blocks, signals } = generateMockData();
    setBlocks(blocks);
    setSignals(signals);
    
    // Add new signals periodically
    const interval = setInterval(() => {
      const { signals: newSignals } = generateMockData(1, 3);
      setSignals(prev => {
        // Keep only the most recent 30 signals
        const updated = [...prev, ...newSignals];
        return updated.slice(-30);
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Draw radar signals
  useEffect(() => {
    if (!radarRef.current) return;
    
    const container = radarRef.current;
    const { width, height } = container.getBoundingClientRect();
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Clear previous signals
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    // Filter signals if needed
    const filteredSignals = filter === 'all' 
      ? signals 
      : signals.filter(signal => signal.type === filter);
    
    // Draw each signal
    filteredSignals.forEach(signal => {
      const dot = document.createElement('div');
      
      // Calculate position (circular radar)
      const signalX = centerX + (signal.x * centerX * 0.8);
      const signalY = centerY + (signal.y * centerY * 0.8);
      
      // Apply styles
      dot.style.position = 'absolute';
      dot.style.width = '10px';
      dot.style.height = '10px';
      dot.style.borderRadius = '50%';
      dot.style.transform = 'translate(-50%, -50%)';
      dot.style.left = `${signalX}px`;
      dot.style.top = `${signalY}px`;
      
      // Color based on signal type
      switch (signal.type) {
        case 'transaction':
          dot.style.backgroundColor = '#3B82F6'; // primary
          break;
        case 'block':
          dot.style.backgroundColor = '#F59E0B'; // beacon
          break;
        case 'validator':
          dot.style.backgroundColor = '#10B981'; // secondary
          break;
      }
      
      // Add pulse animation
      dot.style.animation = 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite';
      
      // Add click event
      dot.addEventListener('click', () => {
        const relatedBlock = blocks.find(block => 
          Math.abs(block.timestamp - signal.timestamp) < 2000
        );
        if (relatedBlock) {
          setSelectedBlock(relatedBlock);
        }
      });
      
      container.appendChild(dot);
    });
    
  }, [signals, filter, blocks]);
  
  // Filter blocks by search query
  const filteredBlocks = blocks.filter(block => 
    block.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const resetFilter = () => {
    setFilter('all');
    setSearchQuery('');
    setSelectedBlock(null);
  };
  
  return (
    <section id="utility" className="py-24 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-orbitron font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Beacon <span className="text-beacon">Navigator</span>
          </motion.h2>
          
          <motion.p
            className="text-white/70 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Visualize and track Solana blockchain activities with our exclusive utility for $BEACON holders. Monitor transactions, blocks, and validator activities in real-time.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Control Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-dark-light/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 h-fit"
          >
            <h3 className="text-xl font-orbitron font-semibold mb-4 text-white">Control Panel</h3>
            
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                <input
                  type="text"
                  placeholder="Search by Block ID..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-dark/60 border border-primary/20 rounded-lg py-2 pl-10 pr-4 text-white/90 focus:outline-none focus:border-primary/50"
                />
              </div>
              
              <button 
                className="bg-primary/20 hover:bg-primary/30 p-2 rounded-lg"
                onClick={resetFilter}
              >
                <RefreshCcw size={18} className="text-primary" />
              </button>
            </div>
            
            <div className="mb-6">
              <div 
                className="flex items-center justify-between cursor-pointer py-2"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <div className="flex items-center space-x-2">
                  <Filter size={18} className="text-primary" />
                  <span className="text-white/90 font-medium">Filter Signals</span>
                </div>
                {isFilterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              
              {isFilterOpen && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    className={`py-2 px-3 rounded-lg text-sm font-medium ${
                      filter === 'all' 
                        ? 'bg-primary/20 text-primary border border-primary/30' 
                        : 'bg-dark/50 text-white/70 border border-white/10 hover:bg-dark/70'
                    }`}
                    onClick={() => setFilter('all')}
                  >
                    All Signals
                  </button>
                  
                  <button
                    className={`py-2 px-3 rounded-lg text-sm font-medium ${
                      filter === 'transaction' 
                        ? 'bg-primary/20 text-primary border border-primary/30' 
                        : 'bg-dark/50 text-white/70 border border-white/10 hover:bg-dark/70'
                    }`}
                    onClick={() => setFilter('transaction')}
                  >
                    Transactions
                  </button>
                  
                  <button
                    className={`py-2 px-3 rounded-lg text-sm font-medium ${
                      filter === 'block' 
                        ? 'bg-beacon/20 text-beacon border border-beacon/30' 
                        : 'bg-dark/50 text-white/70 border border-white/10 hover:bg-dark/70'
                    }`}
                    onClick={() => setFilter('block')}
                  >
                    Blocks
                  </button>
                  
                  <button
                    className={`py-2 px-3 rounded-lg text-sm font-medium ${
                      filter === 'validator' 
                        ? 'bg-secondary/20 text-secondary border border-secondary/30' 
                        : 'bg-dark/50 text-white/70 border border-white/10 hover:bg-dark/70'
                    }`}
                    onClick={() => setFilter('validator')}
                  >
                    Validators
                  </button>
                </div>
              )}
            </div>
            
            <div>
              <h4 className="text-white/90 font-medium mb-3 flex items-center">
                <Clock size={16} className="mr-2 text-primary" />
                Recent Blocks
              </h4>
              
              <div className="space-y-2 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {filteredBlocks.length > 0 ? (
                  filteredBlocks.slice(0, 10).map(block => (
                    <div 
                      key={block.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                        selectedBlock?.id === block.id
                          ? 'bg-primary/20 border border-primary/30'
                          : 'bg-dark/40 border border-white/5 hover:bg-dark/60'
                      }`}
                      onClick={() => setSelectedBlock(block)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/50">ID: {block.id.slice(0, 10)}...</span>
                        <span className="text-xs text-primary/70">
                          {Math.floor((Date.now() - block.timestamp) / 1000)}s ago
                        </span>
                      </div>
                      <div className="flex items-center mt-1 justify-between">
                        <div className="flex items-center">
                          <Zap size={14} className="text-beacon mr-1" />
                          <span className="text-sm text-white/80">{block.transactions} TXs</span>
                        </div>
                        <span className="text-xs text-white/70">{Math.round(block.size / 1024)} KB</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white/50 text-sm p-3">No blocks found</p>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Radar Display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-2"
          >
            <div className="bg-dark-light/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-orbitron font-semibold text-white">Beacon Radar</h3>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-xs text-white/70">Transactions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-beacon"></div>
                    <span className="text-xs text-white/70">Blocks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                    <span className="text-xs text-white/70">Validators</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-primary/20 rounded-full aspect-square mx-auto relative overflow-hidden beacon-radar" ref={radarRef}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full border border-primary/30"></div>
                  <div className="w-1/2 h-1/2 rounded-full border border-primary/30"></div>
                  <div className="w-1/4 h-1/4 rounded-full border border-primary/30"></div>
                  <div className="absolute w-2 h-2 bg-primary rounded-full"></div>
                </div>
                
                {/* Radar sweep effect is handled by CSS in index.css */}
              </div>
              
              {selectedBlock && (
                <div className="mt-6 p-4 bg-dark/50 rounded-xl border border-primary/20">
                  <div className="flex justify-between items-start">
                    <h4 className="text-lg font-orbitron text-white mb-2">Block Details</h4>
                    <button 
                      className="text-white/50 hover:text-white"
                      onClick={() => setSelectedBlock(null)}
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-xs text-white/50 mb-1">Block ID</p>
                      <p className="text-sm text-white/90">{selectedBlock.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-1">Timestamp</p>
                      <p className="text-sm text-white/90">
                        {new Date(selectedBlock.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-1">Transactions</p>
                      <p className="text-sm text-white/90">{selectedBlock.transactions}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-1">Size</p>
                      <p className="text-sm text-white/90">{Math.round(selectedBlock.size / 1024)} KB</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50 mb-1">Fee (SOL)</p>
                      <p className="text-sm text-white/90">{selectedBlock.fee.toFixed(6)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 text-center"
        >
          <p className="text-white/70 mb-6">
            The Beacon Navigator is a powerful tool available exclusively to $BEACON holders. It provides real-time insights into blockchain activities, helping you make informed decisions.
          </p>
          
          <motion.a
            href="#game"
            className="inline-block bg-beacon hover:bg-beacon-dark text-dark font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-beacon/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Try The Beacon Game
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// Icon component
const X = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none"
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default BeaconNavigator;
