import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      // 1. Immediately try to load user from Session Storage for a fast UI update
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      try {
        // 2. Then, verify the session with the backend using the cookie
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });

        // Update user state with the latest data from the server
        setUser(res.data);

        // If server data is different, update session storage
        if (JSON.stringify(res.data) !== storedUser) {
          sessionStorage.setItem("user", JSON.stringify(res.data));
        }
      } catch (err) {
        console.log("No active session found.");
        setUser(null);
        // 3. Clear storage if the session is invalid
        sessionStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
      sessionStorage.removeItem("user");
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
