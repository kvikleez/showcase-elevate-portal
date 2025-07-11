
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  variant?: 'default' | 'subtle' | 'vibrant';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ variant = 'default' }) => {
  // Configuration based on variant
  const config = {
    default: {
      orbs: 3,
      opacity: 0.1,
      size: [300, 400, 350],
      colors: ['primary', 'accent', 'purple-500'],
      positions: [
        { top: '10%', right: '10%' },
        { bottom: '20%', left: '5%' },
        { top: '40%', left: '30%' }
      ]
    },
    subtle: {
      orbs: 2,
      opacity: 0.05,
      size: [250, 300],
      colors: ['primary', 'accent'],
      positions: [
        { top: '10%', right: '10%' },
        { bottom: '20%', left: '5%' }
      ]
    },
    vibrant: {
      orbs: 5,
      opacity: 0.15,
      size: [250, 300, 350, 400, 450],
      colors: ['primary', 'accent', 'purple-500', 'blue-500', 'pink-500'],
      positions: [
        { top: '10%', right: '10%' },
        { bottom: '20%', left: '5%' },
        { top: '40%', left: '30%' },
        { bottom: '40%', right: '20%' },
        { top: '60%', right: '40%' }
      ]
    }
  };
  
  const { orbs, opacity, size, colors, positions } = config[variant];

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {Array.from({ length: orbs }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-${colors[i % colors.length]}/10 blur-3xl`}
          style={{
            ...positions[i],
            width: size[i % size.length],
            height: size[i % size.length],
            opacity: opacity,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [opacity * 0.7, opacity, opacity * 0.7],
            rotate: [0, 360]
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-soft-light pointer-events-none"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), 
                              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedBackground;
