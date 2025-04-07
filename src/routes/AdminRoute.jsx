import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { userInfo } = useAuth();

  if (!userInfo) return null;

  return userInfo.user.role === "admin" ? children : <Navigate to="/" />;
}
