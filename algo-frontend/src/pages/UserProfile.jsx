import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("authUser"));

  const [enrolledCount, setEnrolledCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchEnrollments = async () => {
      try {
        const res = await fetch(
          `${API}/enrollments/user/${user.id}`
        );
        const data = await res.json();
        setEnrolledCount(Array.isArray(data) ? data.length : 0);
      } catch {
        setEnrolledCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, [user?.id]);

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Unauthorized
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 border border-gray-800 rounded-3xl p-8 w-full max-w-md space-y-6"
      >
        <h1 className="text-3xl font-bold text-green-400 text-center">
          My Profile
        </h1>

        {/* USER INFO */}
        <div className="space-y-2 text-gray-300">
          <p>
            <span className="text-gray-400">Name:</span>{" "}
            <b>{user.name}</b>
          </p>
          <p>
            <span className="text-gray-400">Email:</span>{" "}
            <b>{user.email}</b>
          </p>
          <p>
            <span className="text-gray-400">Role:</span>{" "}
            <b className="capitalize">{user.role}</b>
          </p>
        </div>

        {/* STATS */}
        <div className="bg-black border border-gray-700 rounded-xl p-4 text-center">
          <p className="text-gray-400">Enrolled Courses</p>
          <p className="text-3xl font-bold text-green-400">
            {loading ? "..." : enrolledCount}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/my-courses")}
            className="w-full py-3 bg-green-500 text-black rounded-xl font-semibold hover:bg-green-600"
          >
            My Courses
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
              window.location.reload();
            }}
            className="w-full py-3 bg-red-600 rounded-xl font-semibold hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </section>
  );
}
