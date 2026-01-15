import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const API =
    import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration successful! Please login.");
      navigate("/admin/login"); // same login for user/admin
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-6 text-white">
      <motion.form
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl w-full max-w-md border border-gray-800 shadow-2xl space-y-5"
      >
        <h2 className="text-3xl font-bold text-green-400 text-center">
          User Registration
        </h2>

        {error && (
          <div className="text-sm text-red-400 bg-black/50 border border-red-500/30 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-green-500 outline-none"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-green-500 outline-none"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-green-500 outline-none"
        />

        <button
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-xl font-semibold text-black transition disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/admin/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </motion.form>
    </section>
  );
}
