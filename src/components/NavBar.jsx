import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
import Logout from "./Logout";

const NavBar = () => {
  const location = useLocation();
  const { user, logout } = useContext(UserContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        await fetch("http://localhost:3030/users/logout", {
          method: "GET",
          headers: {
            "X-Authorization": accessToken,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
    setShowLogoutModal(false);
    logout();
    navigate("/");
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
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
            {!user && (
              <>
                <Link to={"/login"} className="btn-login">
                  Login
                </Link>
                <Link to={"/register"} className="btn-register">
                  Register
                </Link>
              </>
            )}

            {user && (
              <div className="user-menu">
                <a href="/profile" className="user-profile">
                  <div className="user-icon-placeholder">
                    {/* A default profile pic must be implemented for non-auth users: */}
                    {user.username ? user.username[0].toUpperCase() : "?"}
                  </div>
                </a>
                <button className="btn-logout" onClick={handleLogoutClick}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {showLogoutModal && (
        <Logout onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />
      )}
    </>
  );
};

export default NavBar;
