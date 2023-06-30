import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../store/apis/features/authSlice";
import { WEBLINKS } from "../../store/constants/WebLinks";

function RequireAuth({ children }) {
  const token = useSelector(selectCurrentToken);
  if (token) {
    return children;
  } else {
    window.location.href = WEBLINKS.LOGIN;
    return;
  }
}

export default RequireAuth;
