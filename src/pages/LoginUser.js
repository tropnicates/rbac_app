import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../assets/styles/login.css";
const LoginUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null); 
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = existingUsers.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      setLoggedInUser(user); 
      // alert('Login successful!');
    } else {
      alert('Invalid email or password!');
    }
  };
  return (
    <div className="login-container">
      <div className="admin">User Login</div>
      {loggedInUser ? (
        <div className="logged-in-section">
          <div className='admin'>Welcome, {loggedInUser.name}!</div>
          <div className='subtitle'>You are successfully logged in.</div>
          <Link 
            to="/login/user/edit" 
            state={{ user: loggedInUser }} 
            className="button edit-link"
          >
            Edit Your Details
          </Link>
        </div>
      ) : (
        <div className='formone'><form onSubmit={handleSubmit}>
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
        <button className="button" type="submit">
          Login
        </button>
      </form></div>
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
