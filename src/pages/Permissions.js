import React, { useState } from "react";
import PermissionList from "../components/PermissionsList"; 
import "../assets/styles/Permissions.css"

const Permissions = () => {
  const [permissions, setPermissions] = useState([
    { name: "Read", granted: true },
    { name: "Write", granted: false },
    { name: "Delete", granted: true }
  ]);

  const handlePermissionChange = (index) => {
    const updatedPermissions = [...permissions];
    updatedPermissions[index].granted = !updatedPermissions[index].granted;
    setPermissions(updatedPermissions);
  };

  return (
    <div className="permissions-container">
      <div className="permission">Permissions Management</div>
      <PermissionList permissions={permissions} onChange={handlePermissionChange} />
    </div>
  );
};

export default Permissions;

export const formatPermissions = (permissions) => {
    return permissions.map((permission) => {
      return {
        ...permission,
        granted: permission.granted === true || permission.granted === "true",
      };
    });
  };