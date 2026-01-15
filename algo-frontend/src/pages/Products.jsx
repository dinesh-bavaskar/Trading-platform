import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("authUser"));

  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH COURSES
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API}/products/`);
        const data = await res.json();
        setCourses(Array.isArray(data) ? data : []);
      } catch {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // ✅ FETCH ENROLLMENTS
  useEffect(() => {
    if (!user) return;

    const fetchEnrollments = async () => {
      try {
        const res = await fetch(`${API}/enrollments/user/${user.id}`);
        const data = await res.json();
        const ids = Array.isArray(data)
          ? data.map((e) => e.course_id)
          : [];
        setEnrolledIds(ids);
      } catch {
        setEnrolledIds([]);
      }
    };

    fetchEnrollments();
  }, [user?.id]);

  // UI ONLY
  const toggleDescription = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // ENROLL LOGIC (UNCHANGED)
  const handleEnroll = (course) => {
    if (!user) {
      navigate("/register", {
        state: {
          redirectTo: "/payment",
          course: {
            courseId: course.id,
            title: course.title,
            price: course.price,
          },
        },
      });
      return;
    }

    navigate("/payment", {
      state: {
        courseId: course.id,
        title: course.title,
        price: course.price,
      },
    });
  };

  return (
    <section className="relative min-h-screen px-8 py-16 text-white overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_60%)]" />

      <Helmet>
        <title>Courses | AlgoTrade</title>
      </Helmet>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-4xl font-bold text-center mb-12"
      >
        Our <span className="text-green-400">Courses</span>
      </motion.h2>

      {/* GRID */}
      <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {courses.map((course) => {
          const isExpanded = expandedIds.includes(course.id);
          const isEnrolled = enrolledIds.includes(course.id);

          return (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.05, y: -6 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="flex flex-col h-full rounded-2xl overflow-hidden
              bg-gradient-to-br from-gray-900 to-gray-800
              border border-gray-700 hover:border-green-500"
            >
              {/* IMAGE */}
              {course.image && (
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover opacity-90"
                />
              )}

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold mb-3">
                  {course.title}
                </h3>

                {/* DESCRIPTION */}
                <div className="mb-3">
                  <motion.p
                    layout
                    className={`text-gray-400 text-sm leading-relaxed
                    ${
                      isExpanded
                        ? "max-h-32 overflow-y-auto pr-2"
                        : "max-h-12 overflow-hidden"
                    }`}
                  >
                    {course.description}
                  </motion.p>
                </div>

                {course.description?.length > 80 && (
                  <button
                    onClick={() => toggleDescription(course.id)}
                    className="text-green-400 text-sm font-semibold hover:underline mb-4 self-start"
                  >
                    {isExpanded ? "Show Less ▲" : "Show More ▼"}
                  </button>
                )}

                {/* ✅ PRICE + BUTTON FIXED TO BOTTOM */}
                <div className="mt-auto">
                  <p className="text-2xl font-bold text-green-400 mb-4">
                    ₹{course.price}
                  </p>

                  {isEnrolled ? (
                    <button
                      disabled
                      className="w-full py-3 rounded-xl font-semibold
                      bg-gray-700 text-gray-400 cursor-not-allowed"
                    >
                      ✓ Enrolled
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course)}
                      className="w-full py-3 rounded-xl font-semibold
                      bg-green-500 text-black hover:bg-green-600
                      transition-all duration-300"
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
