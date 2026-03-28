import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ isLoading }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, pointerEvents: 'none' },
  };

  const textVariants = {
    animate: {
      opacity: [0.2, 1, 0.2],
      transition: {
        duration: 1.5,
        repeat: Infinity,
      },
    },
  };

  const dotVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: (custom) => ({
      opacity: 1,
      y: [0, -10, 0],
      transition: {
        delay: custom * 0.1,
        duration: 0.8,
        repeat: Infinity,
      },
    }),
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="visible"
      animate={isLoading ? 'visible' : 'exit'}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50"
    >
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
        ></motion.div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Animated cube */}
        <div className="relative w-24 h-24">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-2 border-cyan-500 rounded-lg"
          ></motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 border-2 border-blue-500 rounded-lg"
          ></motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            ></motion.div>
          </div>
        </div>

        {/* Loading text */}
        <motion.h1 variants={textVariants} animate="animate" className="text-4xl font-bold text-white">
          WEBOCORE
        </motion.h1>

        {/* Animated dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              custom={i}
              variants={dotVariants}
              initial="hidden"
              animate="visible"
              className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            ></motion.div>
          ))}
        </div>

        {/* Loading text */}
        <motion.p variants={textVariants} animate="animate" className="text-gray-400 text-sm tracking-widest">
          INITIALIZING
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
