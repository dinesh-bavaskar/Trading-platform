import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // 🔄 Load auth from localStorage on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("authUser");

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ LOGIN (Admin + User)
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("authUser", JSON.stringify(userData));

    setUser(userData);
    setIsLoggedIn(true);
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");

    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,       // 👈 contains role: "admin" | "user"
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
