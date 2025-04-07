import { createContext, useContext, useState } from "react";
import authAPI from "../services/authAPI";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const [user, setUser] = useState(null);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setToken(token);
  };

  const logout = async () => {
    try {
      await authAPI.logout(token);
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    } finally {
      localStorage.removeItem("authToken");
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
