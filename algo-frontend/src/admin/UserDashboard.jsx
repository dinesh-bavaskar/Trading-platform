import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("authUser"));

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Unauthorized
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <h1 className="text-4xl font-bold text-green-400 mb-2">
          Welcome, {user.name}
        </h1>
        <p className="text-gray-400 mb-10">
          User Dashboard
        </p>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* My Courses */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-green-400 mb-2">
              My Courses
            </h3>
            <p className="text-gray-400 mb-4">
              View your enrolled courses
            </p>
            <Link
              to="/my-courses"
              className="text-green-400 hover:underline"
            >
              View →
            </Link>
          </motion.div>

          {/* Browse Courses */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-green-400 mb-2">
              Explore Courses
            </h3>
            <p className="text-gray-400 mb-4">
              Learn algo trading & strategies
            </p>
            <Link
              to="/products"
              className="text-green-400 hover:underline"
            >
              Explore →
            </Link>
          </motion.div>

          {/* Profile */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-green-400 mb-2">
              My Profile
            </h3>
            <p className="text-gray-400 mb-4">
              View personal details
            </p>
            <Link
              to="/profile"
              className="text-green-400 hover:underline"
            >
              Open →
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
