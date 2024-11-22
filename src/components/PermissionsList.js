import React from "react";

const PermissionList = ({ permissions, onChange }) => {
  return (
    <div className="permission-list">
      <h3>Permissions</h3>
      {permissions.map((permission, index) => (
        <div key={index} className="permission-item">
          <input
            type="checkbox"
            checked={permission.granted}
            onChange={() => onChange(index)}
          />
          <span>{permission.name}</span>
        </div>
      ))}
    </div>
  );
};

export default PermissionList;
