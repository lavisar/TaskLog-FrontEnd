import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  selectCurrentRoles,
} from "../../store/apis/features/authSlice";
import { UserRole } from "../../store/constants/Role";
import { WEBLINKS } from "../../store/constants/WebLinks";
import { useEffect } from "react";

function RequireAdminAuth({ children }) {
  const dispatch = useDispatch();
  const roles = useSelector(selectCurrentRoles);

  const allow =
    roles?.includes(UserRole.ADMIN) || roles?.includes(UserRole.MAIN);
  useEffect(() => {
    if (!allow) {
      dispatch(logOut());
    }
  }, [dispatch, allow]);

  if (allow) {
    return children;
  } else {
    window.location.href = WEBLINKS.ADMIN_LOGIN;
    return;
  }
}

export default RequireAdminAuth;
