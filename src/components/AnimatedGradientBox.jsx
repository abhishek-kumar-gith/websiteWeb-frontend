import React from "react";
import { motion } from "framer-motion";

const LaptopTechAnimation = () => {
  return (
    <div className="w-full h-[480px] sm:h-[340px] lg:h-[420px] flex items-center justify-center bg-slate-950 rounded-2xl relative overflow-hidden">

      {/* 🌌 Background glow */}
      <div className="absolute w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      {/* 💻 Laptop */}
      <div className="relative perspective-[1200px]">

        {/* Screen */}
        <motion.div
          className="relative w-[220px] sm:w-[300px] lg:w-[360px] h-[140px] sm:h-[180px] lg:h-[220px] bg-black rounded-t-xl border border-cyan-500/20 overflow-hidden shadow-2xl"
          animate={{ rotateX: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >

          {/* Top Bar (IDE style) */}
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 text-[10px] text-gray-300">
            <span className="w-2 h-2 bg-red-400 rounded-full"></span>
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span className="ml-2">webocore.js</span>
          </div>

          {/* Screen Content */}
          <div className="p-3 text-[10px] sm:text-xs font-mono text-cyan-400 space-y-1">

            {/* 🔁 Moving Webocore */}
            <motion.div
              className="whitespace-nowrap text-blue-400 opacity-80"
              animate={{ x: ["-100%", "120%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              Webocore • Webocore • Webocore •
            </motion.div>

            {/* Terminal-style lines */}
            <p>const app = "Webocore";</p>
            <p>function build() {"{"}</p>
            <p className="ml-3">return "Scalable Solutions";</p>
            <p>{"}"}</p>

            {/* Blinking cursor */}
            <motion.span
              className="inline-block w-2 h-4 bg-cyan-400 ml-1"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Keyboard */}
        <div className="w-[260px] sm:w-[340px] lg:w-[420px] h-[16px] sm:h-[20px] bg-slate-800 rounded-b-xl shadow-lg mx-auto relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70px] h-[6px] bg-slate-700 rounded"></div>
        </div>
      </div>

      {/* Bottom Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-3 sm:bottom-4 w-full text-center backdrop-blur-md bg-white/5 py-2 sm:py-3"
      >
        <h2 className="text-white text-sm sm:text-lg lg:text-xl font-semibold">
          Webocore
        </h2>
        <p className="text-cyan-400 text-[10px] sm:text-xs mt-1">
          IT Services & Solutions
        </p>
      </motion.div>
    </div>
  );
};

export default LaptopTechAnimation;