import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [context, setContext] = useState({
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
    role: localStorage.getItem("role"),
  });
  const navigate = useNavigate();


  useEffect(() => {
    if (context.isLoggedIn !== null) localStorage.setItem("isLoggedIn", JSON.parse(context.isLoggedIn));
    else {
      localStorage.removeItem("isLoggedIn");
      navigate('/login');
    }

  }, [context.isLoggedIn]);

  useEffect(() => {
    if (context.role !== null) localStorage.setItem("role", context.role);
    else localStorage.removeItem("role");
  }, [context.role]);

  useEffect(() => {
    console.log("isLoggedIn, ", context.isLoggedIn)
    console.log("role, ", context.role)
    console.log("context.isDisponible, ", context.isDisponible)
    if (context.isLoggedIn && context.role === 'PRO' && context.isDisponible === undefined) {

      console.log("ici");
      axios({ url: `${process.env.REACT_APP_SERVER}/pro/dispo`, method: 'GET', withCredentials: true })
        .then((data) => {
          setContext((prev) => ({ ...prev, isDisponible: data.data.isDisponible }))
        })
        .catch((error) => {
          console.error("AuthContext : ", error);
        });
    }
  }, [context]);

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
