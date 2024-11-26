import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../assets/styles/login.css";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminData = JSON.parse(localStorage.getItem("adminData"));
    
    if (!adminData) {
      alert("No admin registered! Please register first.");
      return;
    }

    if (email === adminData.email && password === adminData.password) {
      localStorage.setItem("isAuthenticated", "true");
      setRedirect(true);
    } else {
      alert("Invalid email or password!");
    }
  };

  if (redirect) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="login-container">
      <div className="admin">Admin Login</div>
      <div className="formone">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="button" type="submit">Login</button>
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
