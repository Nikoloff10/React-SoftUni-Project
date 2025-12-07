import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-links">
          <a href="/">HOME</a>
          <a href="/catalog">CATALOG</a>
          <a href="/forum">FORUM</a>
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
