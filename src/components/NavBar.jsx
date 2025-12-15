import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext.jsx";
import { CartContext } from "../contexts/CartContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Logout from "./Logout";

const NavBar = () => {
  const location = useLocation();
  const { user, logout } = useContext(UserContext);
  const { getTotalItems } = useContext(CartContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!user) {
        setProfileImage("");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3030/data/userProfiles?where=userId%3D%22${user.userId}%22`,
          {
            headers: {
              "X-Authorization": user.accessToken,
            },
          }
        );

        if (response.ok) {
          const profiles = await response.json();
          if (profiles.length > 0 && profiles[0].imageURL) {
            setProfileImage(profiles[0].imageURL);
          } else {
            setProfileImage("");
          }
        }
      } catch (err) {
        console.error("Error fetching profile image:", err);
        setProfileImage("");
      }
    };

    fetchProfileImage();
  }, [user, location.pathname]);

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

          {user && (
            <Link to="/cart" className="cart-link">
              <div className="cart-icon">
                <FontAwesomeIcon icon={faShoppingCart} />
                {getTotalItems() > 0 && (
                  <span className="cart-badge">{getTotalItems()}</span>
                )}
              </div>
            </Link>
          )}

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
                <Link to="/profile" className="user-profile">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="user-profile-img"
                    />
                  ) : (
                    <div className="user-icon-placeholder">
                      {user.username ? user.username[0].toUpperCase() : "?"}
                    </div>
                  )}
                </Link>
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
