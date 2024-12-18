import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Sidebar.css";
import ToggleButton from "./ToggleButton";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <ToggleButton onClick={toggleSidebar} />
      <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="sidebar-title">VRV Security</div>
        <p className="sidebar-subtitle">Admin Dashboard</p>
        <ul className="sidebar-menu">
          <li>
            <Link to="/admin/dashboard" className="sidebar-link" onClick={toggleSidebar}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="sidebar-link" onClick={toggleSidebar}>
              Users
            </Link>
          </li>
          <li>
            <Link to="/admin/roles" className="sidebar-link" onClick={toggleSidebar}>
              Roles
            </Link>
          </li>
          <li>
            <Link to="/admin/permissions" className="sidebar-link" onClick={toggleSidebar}>
              Permissions
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
