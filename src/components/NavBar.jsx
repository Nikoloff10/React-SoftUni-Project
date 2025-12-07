import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-links">
          <Link to="/">HOME</Link>
          <Link to="/catalog">CATALOG</Link>
          <Link to="/forum">FORUM</Link>
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
