import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddBlog() {
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const blogId = query.get("id");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlog = async () => {
      if (!blogId) return;

      try {
        setError("");
        setLoading(true);

        const res = await fetch(`${API}/blogs/`);
        const data = await res.json().catch(() => []);

        const blog = Array.isArray(data)
          ? data.find((b) => String(b.id) === String(blogId))
          : null;

        if (!blog) {
          setError("Blog not found for editing.");
          return;
        }

        setTitle(blog.title || "");
        setContent(blog.content || "");
        setImage(blog.image || "");
      } catch {
        setError("Failed to load blog.");
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [blogId, API]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login again.");
      return;
    }

    if (!title.trim() || !content.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const payload = { title, content, image };

      const res = await fetch(
        blogId ? `${API}/blogs/${blogId}` : `${API}/blogs/`,
        {
          method: blogId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Save failed");

      alert(blogId ? "Blog updated ✅" : "Blog saved ✅");
      navigate("/admin/blogs");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Add / Edit Blog
      </h1>

      <div className="bg-gray-900 p-8 rounded-xl max-w-2xl w-full border border-gray-800">
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-black border border-red-500/30 px-3 py-2 rounded">
            {error}
          </div>
        )}

        <div className="mb-5">
          <label className="block mb-2 text-gray-400">Blog Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded bg-black border border-gray-700 text-white"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-gray-400">Blog Content</label>
          <textarea
            rows="8"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 rounded bg-black border border-gray-700 text-white"
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2 text-gray-400">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-3 rounded bg-black border border-gray-700 text-white"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold text-black disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Blog"}
        </button>
      </div>
    </div>
  );
}
