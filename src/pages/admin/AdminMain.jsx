import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken, selectCurrentRoles } from "../../store/apis/features/authSlice";
import { useEffect } from "react";

function AdminMain() {
  useEffect(() => {
    document.title = "Admin Main Page";
  }, [])
  const user = useSelector(selectCurrentUser);
  const role = useSelector(selectCurrentRoles);
  const token = useSelector(selectCurrentToken);

  const welcome = user ? `Welcome ${user}!` : 'Welcome!';
  const tokenAbbr = `${token?.slice(0, 9)}...`;

  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
      <p>Role: {role}</p>
    </section>
  )
  return content;
}

export default AdminMain;