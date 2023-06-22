import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentRoles, selectCurrentToken } from "./authSlice";

function RequireAuth({ children }) {
  const token = useSelector(selectCurrentToken);
  const roles = useSelector(selectCurrentRoles);
  const location = useLocation();
  return token ? (
    children
  ) : (
    <Navigate to="/admin" state={{ from: location }} replace />
  );
}

export default RequireAuth;
