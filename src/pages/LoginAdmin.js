import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/login.css";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingAdmins = JSON.parse(localStorage.getItem('admins')) || [];
    const admin = existingAdmins.find(
      (admin) => admin.email === email && admin.password === password
    );
    
    if (admin) {
      // alert('Login successful!');
      navigate("/admin");  
    } else {
      alert('Invalid email or password!');
    }
  };

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
