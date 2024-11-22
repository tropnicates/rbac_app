import React from "react";

const RoleTable = ({ roles, onEditRole, onDeleteRole }) => {
  return (
    <div className="role-table-container">
      <div className="role-table-header">Roles</div>
      <table className="role-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions.join(", ")}</td>
              <td>
                <button onClick={() => onEditRole(role.id)}>Edit</button>
                <button onClick={() => onDeleteRole(role.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleTable;
