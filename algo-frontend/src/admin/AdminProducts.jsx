import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminProducts() {
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/products/`);
      const data = await res.json().catch(() => []);
      setCourses(Array.isArray(data) ? data : []);
    } catch (e) {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login again.");
      return;
    }

    const ok = window.confirm("Are you sure you want to delete this course?");
    if (!ok) return;

    try {
      const res = await fetch(`${API}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      // ✅ refresh list
      fetchCourses();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Courses</h1>

        <Link
          to="/admin/add-product"
          className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-semibold text-black"
        >
          + Add Course
        </Link>
      </div>

      {loading && (
        <p className="text-gray-400 mb-4">Loading courses...</p>
      )}

      {!loading && courses.length === 0 && (
        <p className="text-gray-400">No courses found.</p>
      )}

      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex justify-between items-center mb-4"
        >
          <div>
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-400 text-sm mt-1">
              {course.description}
            </p>
            <p className="mt-2 font-semibold text-green-400">
              ₹{course.price}
            </p>
          </div>

          <div className="space-x-3">
            <Link
              to={`/admin/add-product?id=${course.id}`}
              className="bg-yellow-500 px-4 py-2 rounded text-black font-semibold"
            >
              Edit
            </Link>

            <button
              onClick={() => handleDelete(course.id)}
              className="bg-red-600 px-4 py-2 rounded font-semibold"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
