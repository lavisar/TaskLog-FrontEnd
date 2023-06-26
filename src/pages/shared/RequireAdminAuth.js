import { useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  selectCurrentRoles,
} from "../../store/apis/features/authSlice";
import { UserRole } from "../../store/constants/Role";
import { WEBLINKS } from "../../store/constants/WebLinks";

function RequireAdminAuth({ children }) {
  const dispatch = useDispatch();
  const roles = useSelector(selectCurrentRoles);
  const location = useLocation();
  if (roles?.includes(UserRole.ADMIN) || roles?.includes(UserRole.MAIN)) {
    return children;
  }
  dispatch(logOut());
  return (
    <Navigate to={WEBLINKS.ADMIN_LOGIN} state={{ from: location }} replace />
  );
}

export default RequireAdminAuth;
