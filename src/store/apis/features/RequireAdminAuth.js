import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentRoles } from "./authSlice";
import { UserRole } from "./UserRole";

function RequireAdminAuth({ children }) {
  const roles = useSelector(selectCurrentRoles);
  const location = useLocation();
  if (roles.includes(UserRole.ADMIN) || roles.includes(UserRole.MAIN)) {
    console.log(roles);
    return children;
  }
  return <Navigate to="/admin" state={{ from: location }} replace />;
}

export default RequireAdminAuth;
