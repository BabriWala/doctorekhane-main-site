"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api, { clearAccessToken, setAccessToken } from "./api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    const { data } = await api.get("/auth/me");
    setUser(data.user);
    return data.user;
  };

  useEffect(() => {
    getMe().catch(() => { clearAccessToken(); setUser(null); }).finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email: email.trim().toLowerCase(), password });
    setAccessToken(data.accessToken);
    setUser(data.user);
    return data.user;
  };

  const register = async (form) => {
    const { data } = await api.post("/auth/register", { ...form, email: form.email.trim().toLowerCase() });
    setAccessToken(data.accessToken);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try { await api.post("/auth/logout"); } finally { clearAccessToken(); setUser(null); }
  };

  return <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: Boolean(user) }}>{children}</AuthContext.Provider>;
}
