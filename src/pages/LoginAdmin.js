import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/login.css";

const LoginAdmin = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return; // Stop submission if validation fails
    }

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
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "input-error" : ""}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "input-error" : ""}
              required
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>
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
