import { useLocation, useNavigate } from "react-router-dom";

export default function Enroll() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Invalid Enrollment
      </div>
    );
  }

  const { title, price } = state;

  const handleFinish = () => {
    navigate("/products");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 text-center">
        <h2 className="text-3xl font-bold text-green-400 mb-4">
          Enrollment Confirmed
        </h2>
        <p className="mb-2">{title}</p>
        <p className="text-green-400 font-bold mb-6">₹{price}</p>

        <button
          onClick={handleFinish}
          className="bg-green-500 text-black px-6 py-3 rounded-lg font-semibold"
        >
          Back to courses
        </button>
      </div>
    </div>
  );
}
