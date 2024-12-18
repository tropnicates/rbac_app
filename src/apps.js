import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Permissions from "./pages/Permissions";
import Sidebar from "./components/Sidebar";
import "./App.css";  

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/permissions" element={<Permissions />} />
            <Route path="/roles" element={<Roles />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
