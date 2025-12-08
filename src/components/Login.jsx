import "../styles/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <p className="register-link">
            Don't have an account? <Link to={"/register"}>Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
