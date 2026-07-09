import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthProviderContext";
import { loginUser, registerUser } from "../services/authService";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await loginUser(email, password);
      const { token: authToken, user: authUser } = response.data;
      localStorage.setItem("token", authToken);
      localStorage.setItem("user", JSON.stringify(authUser));
      setToken(authToken);
      setUser(authUser);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role = "Employee") => {
    setLoading(true);
    try {
      const response = await registerUser(name, email, password, role);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, token, loading, login, register, logout }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
