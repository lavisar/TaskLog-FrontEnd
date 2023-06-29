import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  selectCurrentToken,
} from "../../store/apis/features/authSlice";
import { WEBLINKS } from "../../store/constants/WebLinks";

function RequireAuth({ children }) {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  const nav = useNavigate();
  if (token) {
    return children;
  }
  dispatch(logOut());
  nav(0);
  return <Navigate to={WEBLINKS.LOGIN} state={{ from: location }} replace />;
}

export default RequireAuth;
