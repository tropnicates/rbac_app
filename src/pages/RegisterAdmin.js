import React, { useState } from "react";
import {Link, Navigate } from "react-router-dom";
import "../assets/styles/login.css";

const RegisterAdmin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    localStorage.setItem("adminEmail", email);
    localStorage.setItem("adminPassword", password);
    alert("Registration successful!");
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/login/admin" />;
  }

  return (
    <div className="login-container">
      <div className="admin">Admin Register</div>
      <div className="formone">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your Name"
          value={name}  
          onChange={(e) => setName(e.target.value)} 
          required
        />
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
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="button" type="submit">Register</button>
      </form>
      </div>
      <div className="register-now">
        <p>
          Already have an account?{' '}
          <Link to="/login/admin" className="register-link">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterAdmin;
