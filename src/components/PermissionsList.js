import React from "react";
import "../assets/styles/permissionList.css";

const PermissionList = ({ roles, onPermissionChange }) => {
  const allPermissions = ["Read", "Write", "Delete"];

  return (
    <div className="permissions-list">
      <h3>Permissions</h3>
      {roles.map((role) => (
        <div key={role.id} className="role-permissions">
          <h4></h4>
          <div className="permissions-checkboxes">
            {allPermissions.map((permission) => (
              <label key={permission} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={role.permissions.includes(permission)}
                  onChange={() => onPermissionChange(role.id, permission)}
                />
                {permission}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PermissionList;
