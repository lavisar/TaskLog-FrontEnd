import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

function RequireAuth({ children }) {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  if (token) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;
