import React from 'react';
import { motion } from 'framer-motion';

const AnimatedGradientBox = () => {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
    >
      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'conic-gradient(from 0deg, #06b6d4, #0ea5e9, #0891b2, #06b6d4)',
          opacity: 0.3,
          padding: '2px',
        }}
      />

      {/* Inner gradient background */}
      <motion.div
        animate={{
          background: [
            'linear-gradient(45deg, #0f172a, #06b6d4, #0891b2)',
            'linear-gradient(90deg, #0f172a, #0ea5e9, #06b6d4)',
            'linear-gradient(135deg, #0f172a, #0891b2, #0ea5e9)',
            'linear-gradient(180deg, #0f172a, #06b6d4, #0891b2)',
            'linear-gradient(45deg, #0f172a, #06b6d4, #0891b2)',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-2xl opacity-90"
      />

      {/* Center glow effect */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-cyan-500/20 rounded-full blur-3xl"
      />

      {/* Floating cube with multiple faces */}
      <motion.div
        animate={{ rotateX: 360, rotateY: 360, rotateZ: 180 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="relative z-10 w-24 sm:w-32 lg:w-40 h-24 sm:h-32 lg:h-40"
        style={{ perspective: '1200px' }}
      >
        {/* Cube container */}
        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          {/* Front face */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg sm:rounded-xl shadow-2xl shadow-cyan-500/50"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(48px)',
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-lg sm:text-2xl font-bold text-white/80">
              ✨
            </div>
          </motion.div>

          {/* Back face */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg sm:rounded-xl"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(-48px) rotateY(180deg)',
            }}
          />

          {/* Right face */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg sm:rounded-xl"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateY(90deg) translateZ(48px)',
            }}
          />

          {/* Left face */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg sm:rounded-xl"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateY(-90deg) translateZ(48px)',
            }}
          />

          {/* Top face */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-lg sm:rounded-xl"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(90deg) translateZ(48px)',
            }}
          />

          {/* Bottom face */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-purple-300 to-pink-400 rounded-lg sm:rounded-xl"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(-90deg) translateZ(48px)',
            }}
          />
        </div>
      </motion.div>

      {/* Orbiting particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: Math.cos((i / 8) * Math.PI * 2) * 100,
            y: Math.sin((i / 8) * Math.PI * 2) * 100,
          }}
          transition={{
            duration: 8 + i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute w-2 sm:w-3 h-2 sm:h-3 rounded-full"
          style={{
            background: `hsl(${(i / 8) * 360}, 100%, 50%)`,
            boxShadow: `0 0 20px hsl(${(i / 8) * 360}, 100%, 50%)`,
            top: '50%',
            left: '50%',
            marginTop: '-4px',
            marginLeft: '-4px',
          }}
        />
      ))}

      {/* Text overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-8 text-center z-20"
      >
        <p className="text-cyan-300 text-sm font-semibold">NEXT-GEN TECHNOLOGY</p>
        <p className="text-white/70 text-xs mt-1">Innovate. Build. Scale.</p>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedGradientBox;
