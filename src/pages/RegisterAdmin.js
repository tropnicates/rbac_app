import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/login.css";

const RegisterAdmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;

    if (!regex.test(value)) {
      setNameError("Name should contain only alphabets.");
    } else {
      setNameError("");
    }
    setName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nameError) {
      alert("Please correct the name field.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Retrieve any existing admin data
    const existingAdmins = JSON.parse(localStorage.getItem("admins")) || [];
    const isEmailExists = existingAdmins.some((admin) => admin.email === email);

    if (isEmailExists) {
      alert("Email is already registered.");
      return;
    }

    // Save new admin data
    const newAdmin = { name, email, password };
    const updatedAdmins = [...existingAdmins, newAdmin];
    localStorage.setItem("admins", JSON.stringify(updatedAdmins));

    alert("Registration successful!");
    navigate("/login/admin");
  };

  return (
    <div className="login-container">
      <div className="admin">Admin Register</div>
      <div className="formone">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={handleNameChange}
            required
          />
          {nameError && <p className="error-message">{nameError}</p>}
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
          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
      <div className="register-now">
        <p>
          Already have an account?{" "}
          <Link to="/login/admin" className="register-link">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterAdmin;
