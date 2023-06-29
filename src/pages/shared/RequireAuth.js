// import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  selectCurrentToken,
} from "../../store/apis/features/authSlice";
import { WEBLINKS } from "../../store/constants/WebLinks";
import { useEffect } from "react";

function RequireAuth({ children }) {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  // const location = useLocation();
  // const nav = useNavigate();

  useEffect(() => {
    if (!token) {
      dispatch(logOut());
    }
  }, [dispatch, token]);

  if (token) {
    return children;
  } else {
    window.location.href = WEBLINKS.LOGIN;
    return;
    // return <Navigate to={WEBLINKS.LOGIN} state={{ from: location }} replace />;
  }
}

export default RequireAuth;
