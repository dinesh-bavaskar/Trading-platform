import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

  const [counts, setCounts] = useState({
    courses: 0,
    blogs: 0,
    messages: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);

        const [productsRes, blogsRes, contactsRes] = await Promise.all([
          fetch(`${API}/products/`),
          fetch(`${API}/blogs/`),
          fetch(`${API}/contact/`),
        ]);

        const products = await productsRes.json().catch(() => []);
        const blogs = await blogsRes.json().catch(() => []);
        const contacts = await contactsRes.json().catch(() => []);

        setCounts({
          courses: Array.isArray(products) ? products.length : 0,
          blogs: Array.isArray(blogs) ? blogs.length : 0,
          messages: Array.isArray(contacts) ? contacts.length : 0,
        });
      } catch (err) {
        setCounts({ courses: 0, blogs: 0, messages: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        {/* ✅ quick actions */}
        <div className="flex gap-3">
          <Link
            to="/admin/products"
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold text-black"
          >
            Manage Courses
          </Link>

          <Link
            to="/admin/add-product"
            className="border border-gray-700 hover:border-green-400 px-4 py-2 rounded-lg font-semibold"
          >
            + Add Course
          </Link>

          {/* <Link
            to="/admin/messages"
            className="border border-gray-700 hover:border-green-400 px-4 py-2 rounded-lg font-semibold"
          >
            Messages
          </Link> */}

        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <p className="text-gray-400">Total Courses</p>
          <h2 className="text-4xl font-bold mt-2">
            {loading ? "..." : counts.courses}
          </h2>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <p className="text-gray-400">Total Blogs</p>
          <h2 className="text-4xl font-bold mt-2">
            {loading ? "..." : counts.blogs}
          </h2>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <p className="text-gray-400">Messages</p>
          <h2 className="text-4xl font-bold mt-2">
            {loading ? "..." : counts.messages}
          </h2>
        </div>
      </div>
    </div>
  );
}
