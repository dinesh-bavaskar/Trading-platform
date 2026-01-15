import { motion } from "framer-motion";

export default function FullScreenLoader({ text = "Authenticating..." }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      {/* Gradient glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-purple-500/10 to-blue-500/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="relative flex flex-col items-center gap-6"
      >
        {/* Premium Ring */}
        <motion.div
          className="w-24 h-24 rounded-full border-[3px] border-transparent"
          style={{
            background:
              "conic-gradient(from 0deg, #22c55e, #a855f7, #38bdf8, #22c55e)",
            mask: "radial-gradient(circle at center, transparent 55%, black 56%)",
            WebkitMask:
              "radial-gradient(circle at center, transparent 55%, black 56%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />

        {/* Glow */}
        <div className="absolute w-32 h-32 rounded-full bg-green-500/20 blur-2xl" />

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm tracking-[0.3em] text-green-400 uppercase"
        >
          {text}
        </motion.p>
      </motion.div>
    </div>
  );
}
