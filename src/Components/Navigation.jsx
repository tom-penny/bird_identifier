import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bar">
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? "link-active" : "link")}
      >
        Home
      </NavLink>

      <NavLink
        to="/capture"
        className={({ isActive }) => (isActive ? "link-active" : "link")}
      >
        Capture
      </NavLink>

      <NavLink
        to="/captured"
        className={({ isActive }) => (isActive ? "link-active" : "link")}
      >
        Captured
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) => (isActive ? "link-active" : "link")}
      >
        Profile
      </NavLink>
    </nav>
  );
};

export default Navigation;
