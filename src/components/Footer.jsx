import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Boutique Coffee Market. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/about">About</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
