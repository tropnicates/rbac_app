import React from "react";
import "./RoleTable.css"

const RoleTable = ({ roles, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Role Name</th>
          <th>Description</th>
          <th>Permissions</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {roles.map((role) => (
          <tr key={role.id}>
            <td>{role.name}</td>
            <td>{role.description}</td>
            <td>{role.permissions.join(", ")}</td>
            <td>
              <button onClick={() => onEdit(role.id)}>Edit</button>
              <button onClick={() => onDelete(role.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoleTable;
