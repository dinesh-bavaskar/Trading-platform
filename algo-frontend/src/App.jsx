import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ProgressLoader from "./components/ProgressLoader";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./admin/PrivateRoute";

import Enroll from "./pages/Enroll";
import Register from "./pages/Register";
import UserDashboard from "./admin/UserDashboard";
import UserProfile from "./pages/UserProfile";
// USER SIDE
import Home from "./pages/Home";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Payment from "./pages/Payment";
import MyCourses from "./pages/MyCourses";


// ADMIN SIDE
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import AdminProducts from "./admin/AdminProducts";
import AddProduct from "./admin/AddProduct";
import AdminBlogs from "./admin/AdminBlogs";
import AddBlog from "./admin/AddBlog";
import AdminMessages from "./admin/AdminMessages";

/* ---------------- APP LAYOUT ---------------- */
function AppLayout() {
  const location = useLocation();

  // 🔥 hide navbar on admin login
  const hideNavbar =
  location.pathname === "/admin/login" ||
  location.pathname === "/register";


  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/enroll" element={<Enroll />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <PrivateRoute>
              <AdminProducts />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/add-product"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/blogs"
          element={
            <PrivateRoute>
              <AdminBlogs />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/messages"
          element={
            <PrivateRoute>
              <AdminMessages />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/add-blog"
          element={
            <PrivateRoute>
              <AddBlog />
            </PrivateRoute>
          }
        />

<Route
  path="/profile"
  element={
    <PrivateRoute role="user">
      <UserProfile />
    </PrivateRoute>
  }
/>

        {/* USER DASHBOARD */}
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute role="user">
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
  path="/my-courses"
  element={
    <PrivateRoute role="user">
      <MyCourses />
    </PrivateRoute>
  }
/>
      </Routes>
    </>
  );
}

/* ---------------- APP ROOT ---------------- */
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2100);

    return () => clearTimeout(timer);
  }, []);

  // 🔥 startup loader (runs once)
  if (loading) {
    return <ProgressLoader />;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
