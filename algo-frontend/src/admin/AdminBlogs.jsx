import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AdminBlogs() {
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    try {
      setError("");
      setLoading(true);

      const res = await fetch(`${API}/blogs/`);
      const data = await res.json().catch(() => []);

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch blogs");
      }

      setBlogs(Array.isArray(data) ? data : []);
    } catch (e) {
      setBlogs([]);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login again.");
      return;
    }

    const ok = window.confirm("Are you sure you want to delete this blog?");
    if (!ok) return;

    try {
      const res = await fetch(`${API}/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Delete failed");

      fetchBlogs();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>

        <Link
          to="/admin/add-blog"
          className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-semibold text-black"
        >
          + Add Blog
        </Link>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-400 bg-black border border-red-500/30 px-3 py-2 rounded">
          {error}
        </div>
      )}

      {loading && <p className="text-gray-400 mb-4">Loading blogs...</p>}

      {!loading && blogs.length === 0 && !error && (
        <p className="text-gray-400">No blogs found.</p>
      )}

      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex justify-between items-center mb-4"
        >
          <div>
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-400 text-sm mt-1">
              Slug: {blog.slug}
            </p>

            <p className="text-gray-400 text-sm mt-1">
              {blog.content ? blog.content.slice(0, 120) + "..." : ""}
            </p>
          </div>

          <div className="space-x-3">
            <Link
              to={`/admin/add-blog?id=${blog.id}`}
              className="bg-yellow-500 px-4 py-2 rounded text-black font-semibold"
            >
              Edit
            </Link>

            <button
              onClick={() => handleDelete(blog.id)}
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