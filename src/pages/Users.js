import React, { useState } from "react";
import "../assets/styles/users.css";

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Ravish Kumar", email: "ravish@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Mohit Mahto", email: "mohit@example.com", role: "User", status: "Inactive" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [validationError, setValidationError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (userId) => {
    const user = users.find((u) => u.id === userId);
    setFormData({ ...user });
    setIsEditing(true);
    setEditId(userId);
    setValidationError("");
  };

  const handleDelete = (userId) => {
    setUsers(users.filter((u) => u.id !== userId));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.role || !formData.status) {
      setValidationError("All fields are required.");
      return;
    }

    if (isEditing) {
      setUsers(users.map((u) => (u.id === editId ? { ...u, ...formData } : u)));
      setIsEditing(false);
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
    }

    setFormData({ name: "", email: "", role: "User", status: "Active" });
    setEditId(null);
    setValidationError("");
  };

  return (
    <div className="user">
      <div className="usermanagement">User Management</div>

      <form onSubmit={handleFormSubmit} className="user-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter Name"
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter Email"
          onChange={handleInputChange}
          className="input-field"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="input-field"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="input-field"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit" className="btn-submit">
          {isEditing ? "Update User" : "Add User"}
        </button>
      </form>

      {validationError && <div className="validation-error">{validationError}</div>}

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleEdit(user.id)} className="action-btn edit">
                  Edit
                </button>
                <button onClick={() => handleDelete(user.id)} className="action-btn delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
