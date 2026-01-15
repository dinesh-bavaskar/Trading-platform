import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

export default function AdminMessages() {
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setError("");
        setLoading(true);

        const res = await fetch(`${API}/contact/`);
        const data = await res.json().catch(() => []);

        if (!res.ok) throw new Error(data.message || "Failed to fetch messages");

        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        setMessages([]);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Helmet>
        <title>Admin Messages | AlgoTrade</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>

      {error && (
        <div className="mb-4 text-sm text-red-400 bg-black border border-red-500/30 px-3 py-2 rounded">
          {error}
        </div>
      )}

      {loading && <p className="text-gray-400">Loading messages...</p>}

      {!loading && messages.length === 0 && !error && (
        <p className="text-gray-400">No messages found.</p>
      )}

      <div className="space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className="bg-gray-900 p-6 rounded-xl border border-gray-800"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <h2 className="text-xl font-semibold text-green-400">{m.name}</h2>
              <p className="text-gray-400 text-sm">{m.email}</p>
            </div>

            <p className="text-gray-300 mt-3 whitespace-pre-line">
              {m.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
