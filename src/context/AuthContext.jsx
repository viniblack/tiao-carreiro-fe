import { createContext, useContext, useEffect, useState } from "react";
import authAPI from "../services/authAPI";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const [userInfo, setUserInfo] = useState(null);

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
      setUserInfo(null);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const data = await authAPI.getUser();
          setUserInfo(data);
        } catch (error) {
          console.error("Erro ao buscar usuário:", error);
          logout();
        }
      }
    };

    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout, userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
