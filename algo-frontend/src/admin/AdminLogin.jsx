import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import FullScreenLoader from "../components/FullScreenLoader";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

  // ✅ If already logged in → redirect based on role
  useEffect(() => {
    if (isLoggedIn) {
      const storedUser = JSON.parse(
        localStorage.getItem("authUser")
      );

      if (storedUser?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (storedUser?.role === "user") {
        navigate("/user/user/dashboard");
      }
    }
  }, [isLoggedIn, navigate]);

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    setError("Please enter email and password.");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    login(data.token, data.user);

    // 🔥 delay navigation for premium loader UX
    setTimeout(() => {
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }, 1200);

  } catch (err) {
    setError(err.message);
    setLoading(false);
  }
};


  return (
    <>
      {loading && (
        <FullScreenLoader text="Authenticating..." />
      )}

      <section className="relative min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden">
        {/* ✨ Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,197,94,0.18),transparent_45%)]" />

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl w-full max-w-md space-y-6 border border-gray-800 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-400">
              AlgoTrade
            </h1>
            <p className="text-gray-400 mt-1 tracking-wide">
              Login
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-400 bg-black/50 border border-red-500/30 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-green-500 outline-none transition"
            />

            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-green-500 outline-none transition"
            />

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 p-3 rounded-xl font-semibold text-black transition disabled:opacity-60"
            >
              Login
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500">
            Role-based secure access
          </p>

          <div className="text-center">
            <Link
              to="/"
              className="text-sm text-green-400 hover:underline"
            >
              ← Back to Website
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
