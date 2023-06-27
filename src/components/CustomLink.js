import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";

function CustomLink({ to, children, className, activeClassName, linkClass }) {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const classes = classNames(
    "text-base",
    className,
    currentLocation.pathname === to && activeClassName
  );

  const handleClick = (e) => {
    if (e.metaKey || e.CtrlKey) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handleClick} className={linkClass}>
      <div className={classes}>{children}</div>
    </a>
  );
}

export default CustomLink;
