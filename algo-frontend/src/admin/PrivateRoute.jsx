import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, role }) {
  const { isLoggedIn, user } = useAuth();

  // 🔒 Not logged in
  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  // 🔐 Role mismatch
  if (role && user?.role !== role) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/user/dashboard" replace />;
    }
  }

  // ✅ Access allowed
  return children;
}
