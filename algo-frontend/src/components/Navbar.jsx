import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authUser, setAuthUser] = useState(null);

  // 🔐 Load user on route change
  useEffect(() => {
    const user = localStorage.getItem("authUser");
    setAuthUser(user ? JSON.parse(user) : null);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    setAuthUser(null);
    navigate("/");
  };

  return (
    <nav className="w-full bg-black text-white px-8 py-4 flex justify-between items-center">
      
      {/* LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-green-400 cursor-pointer"
      >
        AlgoTrade
      </h1>

      {/* ================= MENU ================= */}
      <div className="space-x-6 hidden md:flex">
         {/* 🌐 PUBLIC PAGES */}
  <Link to="/" className="hover:text-green-400">Home</Link>
    {/* 👤 USER DASHBOARD */}
  {authUser?.role === "user" && (
    <Link
      to="/user/dashboard"
      className="hover:text-green-400"
    >
      Dashboard
    </Link>
  )}
  <Link to="/products" className="hover:text-green-400">Courses</Link>
  
 {authUser?.role === "user" && (
  <Link to="/profile" className="hover:text-green-400">
    Profile
  </Link>
)}
{authUser?.role === "user" && (
  <Link to="/my-courses" className="hover:text-green-400">
    My Courses
  </Link>
)}


<Link to="/services" className="hover:text-green-400">Services</Link>
  <Link to="/blogs" className="hover:text-green-400">Blogs</Link>

 <Link to="/about" className="hover:text-green-400">About</Link>
  <Link to="/contact" className="hover:text-green-400">Contact</Link>
        {/* 🛠️ ADMIN ONLY */}
        {authUser?.role === "admin" && (
          <>
            <Link to="/admin/dashboard" className="hover:text-green-400">
              Dashboard
            </Link>
            <Link to="/admin/products" className="hover:text-green-400">
              Courses Admin
            </Link>
            <Link to="/admin/blogs" className="hover:text-green-400">
              Blogs Admin
            </Link>
            {/* <Link to="/admin/messages" className="hover:text-green-400">
              Messages
            </Link> */}
          </>
        )}
      </div>

      {/* ================= RIGHT SIDE ================= */}
      {!authUser ? (
        <div className="flex gap-3">
          <Link
            to="/admin/login"
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold text-black"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-4 py-2 rounded-lg font-semibold transition"
          >
            Register
          </Link>
        </div>
      ) : (
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
        >
          Logout
        </button>
      )}
    </nav>
  );
}
