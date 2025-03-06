import { BlockData, BeaconSignal } from '../types';

// Generate random ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Generate mock blockchain data
export const generateMockData = (blockCount = 20, signalCount = 30) => {
  const blocks: BlockData[] = [];
  const signals: BeaconSignal[] = [];
  
  // Current timestamp to start from
  const now = Date.now();
  
  // Generate blocks
  for (let i = 0; i < blockCount; i++) {
    const timestamp = now - (i * 1000); // 1 second apart
    blocks.push({
      id: generateId(),
      timestamp,
      transactions: Math.floor(Math.random() * 50) + 5,
      size: Math.floor(Math.random() * 500000) + 10000, // size in bytes
      fee: Math.random() * 0.01, // SOL fee
    });
  }
  
  // Generate signals
  const signalTypes: ('transaction' | 'block' | 'validator')[] = ['transaction', 'block', 'validator'];
  
  for (let i = 0; i < signalCount; i++) {
    const type = signalTypes[Math.floor(Math.random() * signalTypes.length)];
    const timestamp = now - Math.floor(Math.random() * 10000);
    
    signals.push({
      id: generateId(),
      x: (Math.random() * 2) - 1, // -1 to 1
      y: (Math.random() * 2) - 1, // -1 to 1
      strength: Math.random(),
      type,
      timestamp,
    });
  }
  
  // Sort by timestamp (newest first)
  blocks.sort((a, b) => b.timestamp - a.timestamp);
  signals.sort((a, b) => b.timestamp - a.timestamp);
  
  return { blocks, signals };
};
