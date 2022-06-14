import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [context, setContext] = useState({
    isLoggedIn: localStorage.getItem("isLoggedIn"),
    role: localStorage.getItem("role"),
  });

  useEffect(() => {
    if (context.isLoggedIn !== null) localStorage.setItem("isLoggedIn", context.isLoggedIn);
    else localStorage.removeItem("isLoggedIn");
  }, [context.isLoggedIn]);

  useEffect(() => {
    if (context.role !== null) localStorage.setItem("role", context.role);
    else localStorage.removeItem("role");
  }, [context.role]);

  const getRole = () => {
    return localStorage.getItem("role");
  };

  return (
    <AuthContext.Provider
      value={{ context, setContext, getRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}
