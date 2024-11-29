import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../assets/styles/login.css";

const RegisterUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(value)) {
      setNameError('Name should contain only alphabets and spaces.');
    } else {
      setNameError('');
    }
    setName(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
    setEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
    } else if (!/[A-Z]/.test(value)) {
      setPasswordError('Password must contain at least one uppercase letter.');
    } else if (!/[a-z]/.test(value)) {
      setPasswordError('Password must contain at least one lowercase letter.');
    } else if (!/[0-9]/.test(value)) {
      setPasswordError('Password must contain at least one number.');
    } else {
      setPasswordError('');
    }
    setPassword(value);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match.');
    } else {
      setConfirmPasswordError('');
    }
    setConfirmPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nameError || emailError || passwordError || confirmPasswordError) {
      alert('Please fix the errors before submitting.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const isEmailExists = existingUsers.some((user) => user.email === email);

    if (isEmailExists) {
      alert('Email is already registered.');
      return;
    }

    const newUser = { name, email, password };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    navigate('/login/user');
  };

  return (
    <div className="login-container">
      <div className="admin">Register as User</div>
      <div className="formone">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
              required
            />
            {nameError && <p className="error-message">{nameError}</p>}
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {confirmPasswordError && (
              <p className="error-message">{confirmPasswordError}</p>
            )}
          </div>
          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
      <div className="register-now">
        <p>
          Already have an account?{' '}
          <Link to="/login/user" className="register-link">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterUser;
