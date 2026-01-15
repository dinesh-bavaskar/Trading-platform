import { motion } from "framer-motion";
import { useState } from "react";

export default function Blogs() {
  // ✅ STATIC 5 BLOGS
  const blogs = [
    {
      id: 1,
      title: "Beginner's Guide to Algorithmic Trading",
      description:
        "Algorithmic Trading, commonly known as Algo Trading, is a modern trading approach that allows beginners to participate in financial markets using automation. It uses predefined rules, logic, and programs to execute trades with speed and discipline.",
    },
    {
      id: 2,
      title: "How to Start Algo Trading?",
      description:
        "Algorithmic Trading is transforming the way traders participate in financial markets by reducing emotions and improving execution speed. To start algo trading, one must understand market basics, choose a programming language, and practice backtesting.",
    },
    {
      id: 3,
      title: "Why Risk Management Is Crucial in Trading",
      description:
        "Risk management is the backbone of long-term trading success. Without proper position sizing, stop-loss rules, and drawdown control, even profitable strategies can fail in live markets.",
    },
    {
      id: 4,
      title: "Backtesting Strategies: Common Mistakes to Avoid",
      description:
        "Backtesting helps traders evaluate strategies using historical data, but common mistakes like overfitting, poor data quality, and unrealistic assumptions can lead to misleading results.",
    },
    {
      id: 5,
      title: "Python for Algo Trading: Where to Begin?",
      description:
        "Python has become the most popular language for algo trading due to its simplicity and powerful libraries like Pandas, NumPy, and TA-Lib. This blog explains how beginners can start using Python for trading automation.",
    },
  ];

  const [expandedIds, setExpandedIds] = useState([]);

  const toggleReadMore = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // animation variants
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-screen bg-black text-white px-6 py-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,197,94,0.12),transparent_45%)]" />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-4xl md:text-5xl font-bold text-center mb-16"
      >
        Blogs
      </motion.h1>

      {/* Blog Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto space-y-10"
      >
        {blogs.map((blog) => {
          const isExpanded = expandedIds.includes(blog.id);

          return (
            <motion.div
              key={blog.id}
              variants={card}
              whileHover={{ scale: 1.02 }}
              className="relative bg-gradient-to-br from-gray-900 to-gray-800
              border border-gray-800 rounded-2xl p-8 overflow-hidden group"
            >
              {/* hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 blur-xl" />
              </div>

              <h2 className="relative z-10 text-2xl font-semibold mb-3">
                {blog.title}
              </h2>

              <motion.p
                layout
                className="relative z-10 text-gray-400 mb-4 leading-relaxed"
              >
                {isExpanded
                  ? blog.description
                  : blog.description.slice(0, 140) + "..."}
              </motion.p>

              <button
                onClick={() => toggleReadMore(blog.id)}
                className="relative z-10 inline-flex items-center gap-2
                text-green-400 font-medium hover:gap-3 transition-all"
              >
                {isExpanded ? "Show Less ←" : "Read More →"}
              </button>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
