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

  // Validate name to allow only alphabets and spaces
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

    const trimmedEmail = email.trim().toLowerCase(); 

    if (nameError) {
      alert("Please correct the name field.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Retrieve existing admins from localStorage or default to an empty array
    const existingAdmins = JSON.parse(localStorage.getItem("admins") || "[]");

    // Check if email is already registered
    const isEmailExists = existingAdmins.some(
      (admin) => admin.email === trimmedEmail
    );

    if (isEmailExists) {
      alert("Email is already registered.");
      return;
    }

    const newAdmin = { name, email: trimmedEmail, password };
    const updatedAdmins = [...existingAdmins, newAdmin];
    localStorage.setItem("admins", JSON.stringify(updatedAdmins));
    // alert("Registration successful!");
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
          <input
            type="password"
            placeholder="Confirm your Password"
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
