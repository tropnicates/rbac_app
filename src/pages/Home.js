import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../assets/styles/home.css'; 

const Home = () => {
  const navigate = useNavigate(); 

  const handleLogin = (role) => {
    switch (role) {
      case 'user':
        navigate('/login/user');
        break;
      case 'admin':
        navigate('/login/admin');
        break;
      default:
        break;
    }
  };

  return (
    <div className="home-container">
      <div className="home-title">Welcome to the RBAC System</div>
      <div className='btnone'>
        <div onClick={() => handleLogin('user')} className="buttonone">
          Login as User
        </div>
        <br />
        <div onClick={() => handleLogin('admin')} className="buttonone">
          Login as Admin
        </div>
      </div>
    </div>
  );
};

export default Home;
