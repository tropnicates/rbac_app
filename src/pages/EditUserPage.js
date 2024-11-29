import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditUserPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = location.state || { user: {} };

  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState(user.password || '');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

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

  const handleSave = (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return; // Stop submission if validation fails
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = existingUsers.map((u) =>
      u.email === user.email ? { email, password } : u
    );

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setSuccessMessage('User data updated successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login/user');
  };

  return (
    <div className="edit-user-container">
      <div className="admin">Edit Your Information</div>
      <div className="formone">
        <form onSubmit={handleSave}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Update your email"
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
              placeholder="Update your password"
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
            Save Changes
          </button>
        </form>
      </div>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="logout" onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};

export default EditUserPage;
