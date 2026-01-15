import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

  if (!location.state) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Invalid Payment
      </div>
    );
  }

  const { courseId, title, price } = location.state;
  const user = JSON.parse(localStorage.getItem("authUser"));

  const handlePaymentSuccess = async () => {
    try {
      // 🔐 SAVE ENROLLMENT IN BACKEND
      const res = await fetch(`${API}/enrollments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          course_id: courseId,
          title,
          price,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Enrollment failed");
        return;
      }

      alert("✅ Payment Successful & Course Enrolled!");

      // 👉 Go to enrollment confirmation page
      navigate("/enroll", {
        state: { title, price },
      });
    } catch (error) {
      alert("❌ Something went wrong. Try again.");
    }
  };

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-3xl p-8 w-full max-w-md text-center space-y-6"
      >
        <h1 className="text-3xl font-bold text-green-400">Payment</h1>

        <div className="text-gray-300">
          <p className="font-medium">{title}</p>
          <p className="text-green-400 text-2xl font-bold">₹{price}</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePaymentSuccess}
          className="w-full py-3 bg-green-500 text-black rounded-xl font-semibold hover:bg-green-600"
        >
          Pay Now
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/products")}
          className="w-full py-3 border border-gray-600 rounded-xl hover:bg-gray-800"
        >
          Pay Later
        </motion.button>

        <p className="text-xs text-gray-500">
          * Demo payment page (real gateway can be added later)
        </p>
      </motion.div>
    </section>
  );
}
