import React, { useState } from "react";
import "../assets/styles/users.css";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [sortOption, setSortOption] = useState("");
  const [users, setUsers] = useState([
    { id: 1, name: "Ravish Kumar", email: "ravish@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Mohit Mahto", email: "mohit@example.com", role: "User", status: "Inactive" },
    { id: 3, name: "Aarav Sharma", email: "aarav@example.com", role: "User", status: "Active" },
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

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);

    const sortedUsers = [...users];
    if (option === "nameAsc") {
      sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === "nameDesc") {
      sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
    }
    setUsers(sortedUsers);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="sorting">
        <select value={sortOption} onChange={handleSortChange} className="input-field">
          <option value="">Sort By</option>
          <option value="nameAsc">Name (A-Z)</option>
          <option value="nameDesc">Name (Z-A)</option>
        </select>
      </div>

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
          {filteredUsers.map((user) => (
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
