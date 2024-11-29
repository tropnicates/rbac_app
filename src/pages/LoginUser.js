import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../assets/styles/login.css";

const LoginUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email.trim())
    ) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return; // Stop submission if validation fails
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = existingUsers.find(
      (user) => user.email === email.trim() && user.password === password
    );

    if (user) {
      setLoggedInUser(user);
    } else {
      alert('Invalid email or password!');
    }
  };

  return (
    <div className="login-container">
      <div className="admin">User Login</div>
      {loggedInUser ? (
        <div className="logged-in-section">
          <div className="admin">Welcome, {loggedInUser.name}!</div>
          <div className="subtitle">You are successfully logged in.</div>
          <Link
            to="/login/user/edit"
            state={{ user: loggedInUser }}
            className="button edit-link"
          >
            Edit Your Details
          </Link>
        </div>
      ) : (
        <div className="formone">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? 'input-error' : ''}
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? 'input-error' : ''}
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
      )}
      {!loggedInUser && (
        <div className="register-now">
          <p>
            First time?{' '}
            <Link to="/register/user" className="register-link">
              Register Now
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginUser;
