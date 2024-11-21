import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import ToggleButton from "./ToggleButton"; // Import the ToggleButton

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <ToggleButton onClick={toggleSidebar} /> {/* Use the ToggleButton */}
      <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <h3 className="sidebar-title">VRV Security</h3>
        <p className="sidebar-subtitle">Admin Dashboard</p>
        <ul className="sidebar-menu">
          <li>
            <Link to="/" className="sidebar-link" onClick={toggleSidebar}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/users" className="sidebar-link" onClick={toggleSidebar}>
              Users
            </Link>
          </li>
          <li>
            <Link to="/roles" className="sidebar-link" onClick={toggleSidebar}>
              Roles
            </Link>
          </li>
          <li>
            <Link to="/permissions" className="sidebar-link" onClick={toggleSidebar}>
              Permissions
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
