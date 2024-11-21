import React from "react";

const PermissionList = ({ permissions, onChange }) => {
  return (
    <div>
      <h3>Permissions</h3>
      <div>
        {permissions.map((permission, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={permission.granted}
              onChange={() => onChange(index)}
            />
            <span>{permission.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionList;
