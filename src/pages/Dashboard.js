import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-title">
        <div className="dashboard-title-text">Admin Dashboard</div>
        <div className="dashboard-subtitle">Manage users, roles, and permissions efficiently.</div>
      </div>
      <div className="dashboard-links">
        <Link to="/users" className="dashboard-card">
          <span className="icon">👤</span>
          <div className="card-title">Users Management</div>
          <div className="card-description">View and manage users, assign roles, and more.</div>
        </Link>
        <Link to="/permissions" className="dashboard-card">
          <span className="icon">🔐</span>
          <div className="card-title">Permissions Management</div>
          <div className="card-description">Customize permissions for users and roles dynamically.</div>
        </Link>
        <Link to="/roles" className="dashboard-card">
          <span className="icon">📋</span>
          <div className="card-title">Role Management</div>
          <div className="card-description">Create and edit roles, define permissions for each role.</div>
        </Link>
        
      </div>
    </div>
  );
};

export default Dashboard;
