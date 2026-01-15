import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ProgressLoader() {
  const [progress, setProgress] = useState(0);
  const steps = [
    "Booting Algo Engine",
    "Loading Market Data",
    "Initializing Strategies",
    "Almost Ready",
  ];

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 6) + 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
      }
      setProgress(current);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-purple-500/10 to-blue-500/10 blur-3xl" />

      <div className="relative w-full max-w-xl px-6 text-center">
        {/* 🔥 LOGO */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-green-400 mb-6 tracking-widest"
        >
          ALGOTRADE
        </motion.h1>

        {/* Status text */}
        <motion.p
          key={Math.floor(progress / 25)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-400 tracking-widest mb-4 uppercase"
        >
          {steps[Math.min(Math.floor(progress / 25), steps.length - 1)]}
        </motion.p>

        {/* Progress Bar */}
        <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          />

          {/* Shimmer */}
          <motion.div
            className="absolute top-0 h-full w-24 bg-white/30 blur-md"
            animate={{ x: ["-30%", "130%"] }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              ease: "linear",
            }}
          />
        </div>

        {/* Percentage */}
        <p className="text-gray-500 mt-4 text-sm">{progress}%</p>
      </div>
    </div>
  );
}
