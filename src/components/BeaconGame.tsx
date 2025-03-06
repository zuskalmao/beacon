import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Trophy, RefreshCw, SkipForward } from 'lucide-react';

const GAME_SIZE = 400;
const BEACON_SIZE = 20;
const BLOCK_SIZE = 20;
const INITIAL_SPEED = 2;
const MAX_BLOCKS = 10;

type GameObject = {
  x: number;
  y: number;
  type: 'good' | 'bad';
};

const BeaconGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  
  // Game state refs (to avoid closure issues in animation frame)
  const beaconPosRef = useRef({ x: GAME_SIZE / 2, y: GAME_SIZE / 2 });
  const blocksRef = useRef<GameObject[]>([]);
  const scoreRef = useRef(0);
  const levelRef = useRef(1);
  const gameOverRef = useRef(false);
  const gameSpeedRef = useRef(INITIAL_SPEED);
  const lastBlockTimeRef = useRef(0);
  const blockSpawnRateRef = useRef(1500); // ms between block spawns
  
  // Update refs when state changes
  useEffect(() => {
    scoreRef.current = score;
    levelRef.current = level;
    gameOverRef.current = gameOver;
  }, [score, level, gameOver]);
  
  // Set up high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('beaconGameHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);
  
  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;
      
      const speed = 10;
      const pos = beaconPosRef.current;
      
      switch (e.key) {
        case 'ArrowUp':
          pos.y = Math.max(BEACON_SIZE / 2, pos.y - speed);
          break;
        case 'ArrowDown':
          pos.y = Math.min(GAME_SIZE - BEACON_SIZE / 2, pos.y + speed);
          break;
        case 'ArrowLeft':
          pos.x = Math.max(BEACON_SIZE / 2, pos.x - speed);
          break;
        case 'ArrowRight':
          pos.x = Math.min(GAME_SIZE - BEACON_SIZE / 2, pos.x + speed);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver]);
  
  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let lastTime = 0;
    
    const gameLoop = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      // Clear canvas
      ctx.clearRect(0, 0, GAME_SIZE, GAME_SIZE);
      
      // Spawn new blocks
      if (timestamp - lastBlockTimeRef.current > blockSpawnRateRef.current && blocksRef.current.length < MAX_BLOCKS) {
        spawnBlock();
        lastBlockTimeRef.current = timestamp;
        
        // Increase difficulty as score increases
        if (scoreRef.current > levelRef.current * 10) {
          setLevel(prev => prev + 1);
          gameSpeedRef.current += 0.5;
          blockSpawnRateRef.current = Math.max(300, blockSpawnRateRef.current - 100);
        }
      }
      
      // Update and draw blocks
      updateBlocks(deltaTime / 1000, ctx);
      
      // Draw beacon
      drawBeacon(ctx);
      
      // Check collisions
      checkCollisions();
      
      if (!gameOverRef.current) {
        animationFrameId = requestAnimationFrame(gameLoop);
      }
    };
    
    animationFrameId = requestAnimationFrame(gameLoop);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted, gameOver]);
  
  const spawnBlock = () => {
    const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    let x, y;
    
    switch (side) {
      case 0: // top
        x = Math.random() * GAME_SIZE;
        y = -BLOCK_SIZE / 2;
        break;
      case 1: // right
        x = GAME_SIZE + BLOCK_SIZE / 2;
        y = Math.random() * GAME_SIZE;
        break;
      case 2: // bottom
        x = Math.random() * GAME_SIZE;
        y = GAME_SIZE + BLOCK_SIZE / 2;
        break;
      case 3: // left
        x = -BLOCK_SIZE / 2;
        y = Math.random() * GAME_SIZE;
        break;
      default:
        x = 0;
        y = 0;
    }
    
    const block: GameObject = {
      x,
      y,
      type: Math.random() > 0.3 ? 'good' : 'bad', // 70% good blocks, 30% bad blocks
    };
    
    blocksRef.current.push(block);
  };
  
  const updateBlocks = (deltaTime: number, ctx: CanvasRenderingContext2D) => {
    const blocks = blocksRef.current;
    const beaconPos = beaconPosRef.current;
    const speed = gameSpeedRef.current;
    
    // Draw and update each block
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      
      // Move blocks toward beacon
      const dx = beaconPos.x - block.x;
      const dy = beaconPos.y - block.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Normalize direction and apply speed
      const velocityX = (dx / distance) * speed;
      const velocityY = (dy / distance) * speed;
      
      block.x += velocityX;
      block.y += velocityY;
      
      // Draw blocks
      ctx.beginPath();
      ctx.arc(block.x, block.y, BLOCK_SIZE / 2, 0, Math.PI * 2);
      
      // Good blocks are blue, bad blocks are red
      if (block.type === 'good') {
        ctx.fillStyle = '#3B82F6'; // primary blue
        ctx.strokeStyle = '#60A5FA'; // light blue
      } else {
        ctx.fillStyle = '#EF4444'; // red
        ctx.strokeStyle = '#F87171'; // light red
      }
      
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };
  
  const drawBeacon = (ctx: CanvasRenderingContext2D) => {
    const { x, y } = beaconPosRef.current;
    
    // Draw glow
    const gradient = ctx.createRadialGradient(x, y, BEACON_SIZE / 4, x, y, BEACON_SIZE);
    gradient.addColorStop(0, '#F59E0B');
    gradient.addColorStop(1, 'rgba(245, 158, 11, 0)');
    
    ctx.beginPath();
    ctx.arc(x, y, BEACON_SIZE, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw beacon
    ctx.beginPath();
    ctx.arc(x, y, BEACON_SIZE / 2, 0, Math.PI * 2);
    ctx.fillStyle = '#F59E0B'; // beacon color
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FBBF24'; // lighter beacon color
    ctx.stroke();
  };
  
  const checkCollisions = () => {
    const blocks = blocksRef.current;
    const beaconPos = beaconPosRef.current;
    const collisionThreshold = BEACON_SIZE / 2 + BLOCK_SIZE / 2;
    
    // Check each block for collision with beacon
    for (let i = blocks.length - 1; i >= 0; i--) {
      const block = blocks[i];
      
      const dx = beaconPos.x - block.x;
      const dy = beaconPos.y - block.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < collisionThreshold) {
        // Collision detected
        blocks.splice(i, 1);
        
        if (block.type === 'good') {
          // Collect good block
          setScore(prev => prev + 1);
        } else {
          // Hit by bad block - game over
          endGame();
        }
      }
    }
  };
  
  const startGame = () => {
    // Reset game state
    beaconPosRef.current = { x: GAME_SIZE / 2, y: GAME_SIZE / 2 };
    blocksRef.current = [];
    gameSpeedRef.current = INITIAL_SPEED;
    lastBlockTimeRef.current = 0;
    blockSpawnRateRef.current = 1500;
    
    setScore(0);
    setLevel(1);
    setGameOver(false);
    setGameStarted(true);
  };
  
  const endGame = () => {
    setGameOver(true);
    
    // Update high score if needed
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('beaconGameHighScore', score.toString());
    }
  };
  
  const skipLevel = () => {
    // Increase level and difficulty
    setLevel(prev => prev + 1);
    setScore(prev => prev + 10);
    gameSpeedRef.current += 0.5;
    blockSpawnRateRef.current = Math.max(300, blockSpawnRateRef.current - 100);
  };
  
  return (
    <section id="game" className="py-24 relative overflow-hidden">
      <div className="absolute -top-60 -right-60 w-96 h-96 bg-beacon/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-orbitron font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Beacon <span className="text-beacon">Guardian</span> Game
          </motion.h2>
          
          <motion.p
            className="text-white/70 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Guide your beacon to collect the blue blocks while avoiding the red ones. How many can you collect?
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-dark-light/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10"
            >
              <h3 className="text-xl font-orbitron font-semibold mb-6 text-white">Game Controls</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-dark/40 p-3 rounded-lg">
                  <div className="bg-dark p-2 rounded-md">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                  </div>
                  <span className="text-white/80">Move Up</span>
                </div>
                
                <div className="flex items-center gap-3 bg-dark/40 p-3 rounded-lg">
                  <div className="bg-dark p-2 rounded-md">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                  <span className="text-white/80">Move Down</span>
                </div>
                
                <div className="flex items-center gap-3 bg-dark/40 p-3 rounded-lg">
                  <div className="bg-dark p-2 rounded-md">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </div>
                  <span className="text-white/80">Move Left</span>
                </div>
                
                <div className="flex items-center gap-3 bg-dark/40 p-3 rounded-lg">
                  <div className="bg-dark p-2 rounded-md">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                  <span className="text-white/80">Move Right</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between bg-dark/40 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Trophy size={18} className="text-beacon" />
                    <span className="text-white/80">High Score</span>
                  </div>
                  <span className="font-orbitron font-bold text-beacon">{highScore}</span>
                </div>
                
                <div className="flex items-center justify-between bg-dark/40 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Zap size={18} className="text-primary" />
                    <span className="text-white/80">Current Level</span>
                  </div>
                  <span className="font-orbitron font-bold text-primary">{level}</span>
                </div>
              </div>
              
              {gameStarted && !gameOver && (
                <button
                  onClick={skipLevel}
                  className="mt-6 w-full bg-primary/20 hover:bg-primary/30 text-primary font-medium py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <SkipForward size={18} />
                  Skip to next level
                </button>
              )}
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-2"
          >
            <div className="bg-dark-light/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-orbitron font-semibold text-white">
                  {gameOver ? "Game Over" : gameStarted ? "Collect & Survive" : "Beacon Guardian"}
                </h3>
                
                <div className="flex items-center gap-2">
                  <Zap size={18} className="text-primary" />
                  <span className="font-orbitron font-bold text-primary">{score}</span>
                </div>
              </div>
              
              <div className="mx-auto" style={{ width: GAME_SIZE, height: GAME_SIZE }}>
                {!gameStarted || gameOver ? (
                  <div 
                    className="w-full h-full rounded-lg border border-primary/20 bg-dark/50 flex flex-col items-center justify-center"
                    style={{ backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                  >
                    {gameOver ? (
                      <>
                        <h3 className="text-2xl font-orbitron font-bold text-red-500 mb-2">Game Over!</h3>
                        <p className="text-white/70 mb-1">Final Score: <span className="text-primary font-bold">{score}</span></p>
                        <p className="text-white/70 mb-6">Level Reached: <span className="text-beacon font-bold">{level}</span></p>
                        
                        <button
                          onClick={startGame}
                          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-colors duration-300"
                        >
                          <RefreshCw size={18} />
                          Play Again
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="w-20 h-20 rounded-full bg-beacon/20 flex items-center justify-center mb-6 animate-pulse">
                          <div className="w-12 h-12 rounded-full bg-beacon flex items-center justify-center">
                            <Zap size={24} className="text-white" />
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-orbitron font-bold text-beacon mb-2">Beacon Guardian</h3>
                        <p className="text-white/70 mb-6 text-center max-w-xs">
                          Guide your beacon through the blockchain. Collect blue blocks, avoid the red ones!
                        </p>
                        
                        <button
                          onClick={startGame}
                          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-colors duration-300"
                        >
                          Start Game
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <canvas
                    ref={canvasRef}
                    width={GAME_SIZE}
                    height={GAME_SIZE}
                    className="rounded-lg border border-primary/20 bg-dark/50"
                    style={{ backgroundImage: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                  />
                )}
              </div>
              
              {gameStarted && !gameOver && (
                <div className="mt-4">
                  <p className="text-white/70 text-sm text-center">
                    Use arrow keys to move your beacon. Collect blue blocks and avoid the red ones!
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BeaconGame;
