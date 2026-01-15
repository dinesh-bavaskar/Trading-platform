import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        alert("Message Sent Successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert("Something went wrong");
      }
    } catch {
      alert("Server not responding");
    }
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center px-6 text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-emerald-950 to-black" />

      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      {/* FORM CARD */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-gray-900/90 backdrop-blur border border-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl space-y-5"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center text-green-400"
        >
          Contact Us
        </motion.h2>

        {/* Input fields */}
        {[
          {
            placeholder: "Your Name",
            value: name,
            setValue: setName,
            type: "text",
          },
          {
            placeholder: "Your Email",
            value: email,
            setValue: setEmail,
            type: "email",
          },
        ].map((field, i) => (
          <motion.input
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            type={field.type}
            placeholder={field.placeholder}
            value={field.value}
            onChange={(e) => field.setValue(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
        ))}

        {/* Textarea */}
        <motion.textarea
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          required
          className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
        />

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-green-500 text-black font-semibold rounded-lg hover:bg-green-600 transition"
        >
          Send Message
        </motion.button>
      </motion.form>
    </section>
  );
}
