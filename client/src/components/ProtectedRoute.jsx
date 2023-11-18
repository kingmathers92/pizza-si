import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../redux/user/userSlice";
import PropTypes from "prop-types";

export default function ProtectedRoute({ element: Component }) {
  const currentUser = useSelector(selectUser);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return Component;
}

ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};
