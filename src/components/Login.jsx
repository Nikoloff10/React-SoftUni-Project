import { useState, useContext } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (!data.email || !data.password) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3030/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Login failed.");
        setIsLoading(false);
        return;
      }

      login(result);

      navigate("/");
    } catch (err) {
      setError("Network error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="register-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
