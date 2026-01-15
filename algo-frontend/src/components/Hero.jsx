import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-emerald-950 to-black" />

      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      {/* MARKET TICKER (TOP, BELOW NAVBAR) */}
      <motion.div
        animate={{ x: ["100%", "-120%"] }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
        className="
          absolute 
          top-20 
          left-0 
          w-full 
          text-green-400 
          text-sm 
          tracking-widest 
          opacity-90
          whitespace-nowrap
        "
      >
        BTC ▲ 2.4% • NIFTY ▲ 1.2% • BANKNIFTY ▼ 0.6% • ETH ▲ 3.1%
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight"
          >
            Algo Trading <br />
            <span className="text-green-400">Platform</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-gray-300 text-lg max-w-xl"
          >
            Design, backtest and deploy intelligent trading strategies using
            real-world automation and AI-driven systems.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(34,197,94,0.6)",
                  "0 0 18px rgba(34,197,94,0.6)",
                  "0 0 0px rgba(34,197,94,0.6)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              onClick={() => navigate("/products")}
              className="px-8 py-4 bg-green-500 text-black font-semibold rounded-xl"
            >
              Get Started
            </motion.button>

            <button
              onClick={() => navigate("/products")}
              className="px-8 py-4 border border-gray-500 rounded-xl hover:bg-white hover:text-black transition"
            >
              View Courses
            </button>
          </motion.div>

          {/* STATS */}
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
            {[
              ["10k+", "Active Traders"],
              ["50+", "Strategies"],
              ["99.9%", "Uptime"],
            ].map(([num, label], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.2 }}
                className="text-center"
              >
                <p className="text-2xl font-bold text-green-400">{num}</p>
                <p className="text-gray-400 text-sm">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT – FLOATING TRADING CARDS */}
        <div className="relative hidden md:block h-[420px]">
          {[
            { title: "AI Strategy", top: 80 },
            { title: "Live Backtesting", top: 190 },
            { title: "Auto Execution", top: 300 },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: [0, -12, 0] }}
              transition={{
                delay: 0.8 + i * 0.2,
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute right-0 bg-gray-900/80 backdrop-blur border border-gray-700 rounded-2xl p-6 w-72 shadow-xl"
              style={{ top: card.top }}
            >
              <p className="text-green-400 font-semibold mb-2">
                {card.title}
              </p>
              <p className="text-gray-400 text-sm">
                Intelligent automation powered by real-time market data.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
