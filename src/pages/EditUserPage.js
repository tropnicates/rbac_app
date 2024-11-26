import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditUserPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || { user: {} };

  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState(user.password || '');
  const [successMessage, setSuccessMessage] = useState('');
  const handleSave = (e) => {
    e.preventDefault();

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
      <div className='formone'>
      <form onSubmit={handleSave}>
        <input
          type="email"
          placeholder="Update your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Update your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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