import React from "react";
import "../assets/styles/usertable.css"

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <div className="table-header">
        <div className="table-cell header-cell">Name</div>
        <div className="table-cell header-cell">Email</div>
        <div className="table-cell header-cell">Role</div>
        <div className="table-cell header-cell">Status</div>
        <div className="table-cell header-cell">Actions</div>
      </div>
      <div className="table-body">
        {users.map(user => (
          <div className="table-row" key={user.id}>
            <div className="table-cell">{user.name}</div>
            <div className="table-cell">{user.email}</div>
            <div className="table-cell">{user.role}</div>
            <div className="table-cell">{user.status}</div>
            <div className="table-cell">
              <button onClick={() => onEdit(user.id)} className="btn-edit">
                Edit
              </button>
              <button onClick={() => onDelete(user.id)} className="btn-delete">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
