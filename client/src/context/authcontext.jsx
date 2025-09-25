import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/user.jsx";
import { loginAdmin, registerAdmin } from "../api/admin.jsx";
import { loginHomechef, registerHomechef } from "../api/homechef.jsx"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (credentials, role) => {
    let data;
    if (role === "admin") {
      data = await loginAdmin(credentials);
    } else if (role === "user") {
      data = await loginUser(credentials);
    } else if (role === "homechef") {
      data = await loginHomechef(credentials);
    } else {
      throw new Error("Invalid role");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify({ email: credentials.email, role }));
    setUser({ email: credentials.email, role });
  };

  const register = async (formData, role) => {
    if (role === "admin") {
      await registerAdmin(formData);
    } else if (role === "user") {
      await registerUser(formData);
    } else if (role === "homechef") {
      await registerHomechef(formData);
    } else {
      throw new Error("Invalid role");
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
