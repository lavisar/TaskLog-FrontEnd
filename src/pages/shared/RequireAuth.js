import { useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentToken } from "../../store/apis/features/authSlice";
import { WEBLINKS } from "../../store/constants/WebLinks";

function RequireAuth({ children }) {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  if (token) {
    return children;
  }
  dispatch(logOut());
  return <Navigate to={WEBLINKS.HOME} state={{ from: location }} replace />;
}

export default RequireAuth;
