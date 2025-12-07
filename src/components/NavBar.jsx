import { Link, useLocation } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-links">
          {location.pathname !== "/" && <Link to="/">HOME</Link>}
          {location.pathname !== "/catalog" && (
            <Link to="/catalog">CATALOG</Link>
          )}
          {location.pathname !== "/forum" && <Link to="/forum">FORUM</Link>}
        </div>

        <div className="navbar-auth">
          <a href="/login" className="btn-login">
            Login
          </a>
          <a href="/register" className="btn-register">
            Register
          </a>
          <div className="user-menu">
            <a href="/profile" className="user-profile">
              <div className="user-icon-placeholder">U</div>
            </a>
            <button className="btn-logout">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
