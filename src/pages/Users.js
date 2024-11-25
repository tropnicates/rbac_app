import React, { useState } from "react";
import { formatUserData } from "../utils/formatPermissions";
import { validateUserInput } from "../utils/validateInputs";
import "../assets/styles/users.css";

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Ravish Kumar", email: "ravish@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Abhishek Ranjan", email: "mohit@example.com", role: "User", status: "Inactive" },
    { id: 3, name: "Priya Verma", email: "priya@example.com", role: "User", status: "Inactive" },
    { id: 4, name: "Prity Yadav", email: "prity@example.com", role: "User", status: "Inactive" },
    { id: 5, name: "Prabhat Raj", email: "prabhat@example.com", role: "User", status: "Inactive" },
    { id: 6, name: "Dhruv Gupta", email: "dhruv@example.com", role: "User", status: "Inactive" },
    { id: 7, name: "Jatin Sahu", email: "jatin@example.com", role: "User", status: "Inactive" },
    { id: 8, name: "Mithoon Raj", email: "mihtoon@example.com", role: "User", status: "Inactive" },
    { id: 9, name: "Sweety Rani", email: "sweety@example.com", role: "User", status: "Inactive" },
    { id: 10, name: "Aditya Raj", email: "aditya@example.com", role: "User", status: "Inactive" },
  ]);

  const [formData, setFormData] = useState({ name: "", email: "", role: "User", status: "Active" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formattedData = formatUserData(formData);
    const validation = validateUserInput(formattedData);

    if (!validation.isValid) {
      setValidationError(validation.message);
      return;
    }

    if (isEditing) {
      setUsers(users.map((u) => (u.id === editId ? { ...u, ...formattedData } : u)));
      setIsEditing(false);
    } else {
      setUsers([...users, { ...formattedData, id: Date.now() }]);
    }

    setFormData({ name: "", email: "", role: "User", status: "Active" });
    setValidationError("");
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSort = (field) => {
    const newSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newSortOrder);

    const sortedUsers = [...users].sort((a, b) => {
      if (a[field] < b[field]) return newSortOrder === "asc" ? -1 : 1;
      if (a[field] > b[field]) return newSortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setUsers(sortedUsers);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery) ||
      user.role.toLowerCase().includes(searchQuery) ||
      user.status.toLowerCase().includes(searchQuery)
  );

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

      <div className="search-sort">
        <button
          onClick={() => handleSort("name")}
          className="sort-btn"
        >
          Sort by Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
        <button
          onClick={() => handleSort("email")}
          className="sort-btn"
        >
          Sort by Email {sortField === "email" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearch}
          className="input-field search-bar"
        />
      </div>

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
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button
                  onClick={() => {
                    setFormData({ ...user });
                    setIsEditing(true);
                    setEditId(user.id);
                  }}
                  className="action-btn edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => setUsers(users.filter((u) => u.id !== user.id))}
                  className="action-btn delete"
                >
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