import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <section
      className="relative min-h-screen text-white px-8 py-20 overflow-hidden
      bg-[url('https://images.unsplash.com/photo-1642790106117-e829e14a795f')]
      bg-cover bg-center bg-no-repeat"
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/85"></div>

      {/* Soft background glow (reduced) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_65%)]"></div>

      <Helmet>
        <title>About Us | AlgoTrade</title>
        <meta
          name="description"
          content="Learn about AlgoTrade — our mission, team, and vision for algorithmic trading education and services."
        />
      </Helmet>

      {/* ✅ CLEAN HEADING */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          About <span className="text-green-400">AlgoTrade</span>
        </h2>

        {/* underline */}
        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-green-400/80"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Who We Are */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900 to-gray-800
          rounded-2xl p-8 border border-gray-700 hover:border-green-500 transition"
        >
          <h3 className="text-2xl font-semibold mb-4 text-green-400">
            Who We Are
          </h3>

          <p className="text-gray-300 leading-relaxed">
            AlgoTrade is a premium algorithmic trading learning platform focused
            on building real-world trading skills. We help traders learn how to
            build, backtest, and deploy automated strategies using professional
            tools and systematic approaches.
          </p>

          <p className="text-gray-300 leading-relaxed mt-4">
            Our goal is simple: deliver high-quality learning, real strategies,
            and scalable automation services for serious traders.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900 to-gray-800
          rounded-2xl p-8 border border-gray-700 hover:border-green-500 transition"
        >
          <h3 className="text-2xl font-semibold mb-4 text-green-400">
            Our Mission
          </h3>

          <ul className="space-y-4 text-gray-300">
            {[
              "Teach algorithmic trading from beginner to advanced",
              "Provide industry-level backtesting and automation guidance",
              "Help traders build discipline through systems, not emotions",
              "Offer scalable services for automation and strategy building",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-1 text-green-400">✔</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Team */}
      <div className="relative z-10 max-w-5xl mx-auto mt-20">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-10 text-center"
        >
          Our <span className="text-green-400">Team</span>
        </motion.h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Founder", role: "Algo Trading Specialist" },
            { name: "Strategy Lead", role: "Quant & Backtesting" },
            { name: "Developer", role: "Automation & Integration" },
          ].map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800
              rounded-2xl p-6 border border-gray-700 hover:border-green-500 transition text-center"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-400 to-blue-500
              flex items-center justify-center text-black font-bold text-xl mb-4">
                {member.name.charAt(0)}
              </div>

              <h4 className="text-xl font-semibold">{member.name}</h4>
              <p className="text-gray-400 mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
