import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import "../assets/styles/login.css";

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const storedEmail = localStorage.getItem("adminEmail");
    const storedPassword = localStorage.getItem("adminPassword");

    if (email === storedEmail && password === storedPassword) {
      localStorage.setItem("isAuthenticated", "true");
      setRedirect(true);
    } else {
      alert("Invalid email or password!");
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register/admin'); 
  };

  if (redirect) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="login-container">
      <div className='admin'>Admin Login</div>
      <div className='formone'>
      <div>
        <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='button' type="submit">Login</button>
      </form>
      </div>
      </div>
      <div className="register-now">
        <p>
          Want access?{' '}
          <Link to="/register/admin" className="register-link">
            Register as Admin
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginAdmin;
