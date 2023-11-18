// ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { selectUser } from "../redux/user/userSlice";

export default function ProtectedRoute() {
  const currentUser = useSelector(selectUser);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
