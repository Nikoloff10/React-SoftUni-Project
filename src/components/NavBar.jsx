import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import { useState } from "react";
import Logout from "./Logout";

const NavBar = () => {
  const location = useLocation();
  const username = localStorage.getItem("username");
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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
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
            <Link to={"/login"} className="btn-login">
              Login
            </Link>
            <Link to={"/register"} className="btn-register">
              Register
            </Link>
            <div className="user-menu">
              <a href="/profile" className="user-profile">
                <div className="user-icon-placeholder">
                  {username ? username[0].toUpperCase() : "?"}
                </div>
              </a>
              <button className="btn-logout" onClick={handleLogoutClick}>
                Logout
              </button>
            </div>
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
