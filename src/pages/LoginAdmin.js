import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/login.css";
const LoginAdmin = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    const existingAdmins = JSON.parse(localStorage.getItem("admins") || "[]");

    const admin = existingAdmins.find(
      (admin) =>
        admin.email === trimmedEmail && admin.password === password
    );

    if (admin) {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true); // Update state
      navigate("/admin/dashboard"); // Direct navigation
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="login-container">
      <div className="admin">Admin Login</div>
      <div className="formone">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="button" type="submit">
            Login
          </button>
        </form>
      </div>
      <div className="register-now">
        <p>
          Want access?{" "}
          <Link to="/register/admin" className="register-link">
            Register as Admin
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginAdmin;
