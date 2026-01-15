import { useEffect, useState } from "react";
import { motion } from "framer-motion";


export default function MyCourses() {
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";
  const user = JSON.parse(localStorage.getItem("authUser"));

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await fetch(
          `${API}/enrollments/user/${user.id}`
        );
        const data = await res.json();
        setCourses(Array.isArray(data) ? data : []);
      } catch {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <section className="min-h-screen bg-black text-white px-8 py-16">
      <h1 className="text-4xl font-bold text-green-400 text-center mb-12">
        My Courses
      </h1>

      {loading && (
        <p className="text-center text-gray-400">
          Loading enrolled courses...
        </p>
      )}

      {!loading && courses.length === 0 && (
        <p className="text-center text-gray-400">
          You have not enrolled in any courses yet.
        </p>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold mb-2">
              {course.course_title}
            </h3>

            <p className="text-green-400 font-bold text-lg">
              ₹{course.price}
            </p>

            <p className="text-sm text-gray-400 mt-2">
              Enrolled on{" "}
              {new Date(course.enrolled_at).toLocaleDateString()}
            </p>

            <span className="inline-block mt-4 px-3 py-1 bg-green-600 text-black text-sm rounded-full">
              Enrolled
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
