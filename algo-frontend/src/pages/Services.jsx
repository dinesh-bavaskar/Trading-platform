import { motion } from "framer-motion";

const services = [
  {
    title: "Algorithmic Trading",
    desc: "Automated trading strategies with data-driven decisions.",
    icon: "📈",
  },
  {
    title: "Strategy Development",
    desc: "Custom strategies based on technical & quantitative analysis.",
    icon: "🧠",
  },
  {
    title: "Risk Management",
    desc: "Capital protection with smart position sizing & stop-loss.",
    icon: "🛡️",
  },
  {
    title: "Live Market Automation",
    desc: "Fully automated execution connected with broker APIs.",
    icon: "⚡",
  },
  {
    title: "Backtesting & Optimization",
    desc: "Test strategies on historical data and optimize performance before live deployment.",
    icon: "📊",
  },
  {
    title: "Indicator Development",
    desc: "Custom technical indicators built for specific trading strategies.",
    icon: "📐",
  },
  {
    title: "Broker API Integration",
    desc: "Seamless integration with broker APIs for live trading and data access.",
    icon: "🔗",
  },
  {
    title: "Algo Trading Consultation",
    desc: "One-on-one guidance for strategy building and automation.",
    icon: "🤝",
  },
];

export default function Services() {
  return (
    <section
      className="relative min-h-screen text-white px-8 py-20 overflow-hidden
      bg-[url('https://images.unsplash.com/photo-1642790106117-e829e14a795f')]
      bg-cover bg-center bg-no-repeat"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Green glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_60%)]"></div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-4xl md:text-5xl font-bold text-center mb-16"
      >
        Our <span className="text-green-400">Services</span>
      </motion.h2>

      {/* Services Grid */}
      <div className="relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.06,
              y: -8,
              boxShadow: "0px 20px 40px rgba(34,197,94,0.25)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-gray-900 to-gray-800
            p-6 rounded-2xl border border-gray-700
            hover:border-green-500 overflow-hidden text-center"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500
            bg-gradient-to-r from-transparent via-green-500/10 to-transparent"></div>

            {/* Icon */}
            <div
              className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-full
              bg-gradient-to-br from-green-400 to-emerald-600
              flex items-center justify-center text-3xl text-black"
            >
              {service.icon}
            </div>

            <h3 className="relative z-10 text-xl font-semibold mb-3 text-green-400">
              {service.title}
            </h3>

            <p className="relative z-10 text-gray-400 text-sm leading-relaxed">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
