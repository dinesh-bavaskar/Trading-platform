import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddProduct() {
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const courseId = query.get("id");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourse = async () => {
      if (!courseId) return;

      try {
        setError("");
        setLoading(true);

        const res = await fetch(`${API}/products/`);
        const data = await res.json().catch(() => []);

        const course = Array.isArray(data)
          ? data.find((c) => String(c.id) === String(courseId))
          : null;

        if (!course) {
          setError("Course not found for editing.");
          return;
        }

        setTitle(course.title || "");
        setDescription(course.description || "");
        setPrice(course.price ?? "");
        setImage(course.image || "");
      } catch {
        setError("Failed to load course.");
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login again.");
      return;
    }

    if (!title.trim()) {
      setError("Course title is required.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const payload = {
        title,
        description,
        price: Number(price || 0),
        image,
      };

      const res = await fetch(
        courseId ? `${API}/products/${courseId}` : `${API}/products/`,
        {
          method: courseId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Save failed");

      alert(courseId ? "Course updated ✅" : "Course saved ✅");
      navigate("/admin/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Add / Edit Course
      </h1>

      <div className="bg-gray-900 p-8 rounded-xl max-w-2xl w-full border border-gray-800">
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-black border border-red-500/30 px-3 py-2 rounded">
            {error}
          </div>
        )}

        <div className="mb-5">
          <label className="block mb-2 text-gray-400">Course Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded bg-black border border-gray-700 text-white"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-gray-400">
            Course Description
          </label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded bg-black border border-gray-700 text-white"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-gray-400">Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
          {loading ? "Saving..." : "Save Course"}
        </button>
      </div>
    </div>
  );
}
