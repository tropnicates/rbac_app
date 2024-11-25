import React from "react";
import "../assets/styles/permissionList.css";

const PermissionList = ({ roles, onPermissionChange }) => {
  const allPermissions = ["Read", "Write", "Delete"];
  
  return (
    <div className="permissions-list">



      
      <div className="title">Permissions</div>
      {roles.map((role) => (
        <div key={role.id} className="role-permissions">
          <div className="rolename">{role.name}</div>
          <div className="permissions-checkboxes">
            {allPermissions.map((permission) => (
              <div key={permission} className="checkbox-container">
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={role.permissions.includes(permission)}
                  onChange={() => onPermissionChange(role.id, permission)}
                />
              </div>
              <div className="checkbox-text">{permission}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PermissionList;
