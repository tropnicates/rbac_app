import React, { useState } from "react";
import "./RoleTable.css";

const RoleTable = ({ roles, onEdit, onDelete }) => {
  const [editingRole, setEditingRole] = useState(null);

  const handleEditClick = (role) => {
    setEditingRole(role); 
    onEdit(role); 
  };

  const handlePermissionChange = (e, roleId) => {
    const updatedRoles = roles.map((role) =>
      role.id === roleId
        ? {
            ...role,
            permissions: role.permissions.map((perm) =>
              perm === e.target.value ? e.target.value : perm
            ),
          }
        : role
    );
    onEdit(updatedRoles); 
  };

  return (
    <div className="role-table-container">
      <div className="role-table-header">
        <div className="role-table-cell">Role Name</div>
        <div className="role-table-cell">Description</div>
        <div className="role-table-cell">Permissions</div>
        <div className="role-table-cell">Actions</div>
      </div>
      {roles.map((role) => (
        <div className="role-table-row" key={role.id}>
          <div className="role-table-cell">{role.name}</div>
          <div className="role-table-cell">{role.description}</div>
          <div className="role-table-cell">
            {editingRole?.id === role.id ? (
              <select
                multiple
                value={role.permissions}
                onChange={(e) => handlePermissionChange(e, role.id)}
              >
                <option value="Read">Read</option>
                <option value="Write">Write</option>
                <option value="Delete">Delete</option>
              </select>
            ) : (
              role.permissions.join(", ")
            )}
          </div>
          <div className="role-table-cell">
            <button onClick={() => handleEditClick(role)} className="btn-edit">
              {editingRole?.id === role.id ? "Save" : "Edit"}
            </button>
            <button
              onClick={() => onDelete(role.id)}
              className="btn-delete"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoleTable;
