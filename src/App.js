import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import LoginUser from './pages/LoginUser';
import LoginAdmin from './pages/LoginAdmin';
import RegisterAdmin from './pages/RegisterAdmin';
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Permissions from "./pages/Permissions";
import Sidebar from "./components/Sidebar";
import RegisterUser from "./pages/RegisterUser"
import EditUserPage from "./pages/EditUserPage"
import "./App.css";

const App = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated"); 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/user" element={<LoginUser />} />
        <Route path="/login/admin" element={<LoginAdmin />} />
        <Route path="/register/admin" element={<RegisterAdmin />} />
        <Route path="/register/user" element={<RegisterUser/>}/>
        <Route path="/login/user/edit" element={<EditUserPage/>}/>

        {isAuthenticated ? (
          <Route path="/admin/*" element={<AdminLayout />} /> 
        ) : (
          <Route path="/admin/*" element={<Navigate to="/login/admin" replace />} />
        )}
      </Routes>
    </Router>
  );
};

const AdminLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="permissions" element={<Permissions />} />
          <Route path="roles" element={<Roles />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
