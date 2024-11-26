import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../assets/styles/login.css";

const RegisterUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/; 

    if (!regex.test(value)) {
      setNameError('Name should contain only alphabets');
    } else {
      setNameError('');
    }
    setName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nameError) {
      alert('Please correct the name field');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const isEmailExists = existingUsers.some((user) => user.email === email);

    if (isEmailExists) {
      alert('Email is already registered');
      return;
    }

    const newUser = { name, email, password };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    alert('Registration successful!');
    navigate('/login/user');
  };

  return (
    <div className="login-container">
      <div className="admin">Register as User</div>
      <div className='formone'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
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
