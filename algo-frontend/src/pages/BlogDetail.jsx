import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BlogDetail() {
  const { slug } = useParams();

  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API}/blogs/${slug}`);
        const data = await res.json().catch(() => null);

        if (!res.ok) {
          setBlog(null);
          return;
        }

        setBlog(data);
      } catch (err) {
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return <p className="text-white p-10">Loading...</p>;
  }

  if (!blog) {
    return <p className="text-white p-10">Blog not found</p>;
  }

  return (
    <section className="min-h-screen bg-black text-white px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

        {/* ✅ content multiline */}
        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
          {blog.content}
        </p>
      </div>
    </section>
  );
}
