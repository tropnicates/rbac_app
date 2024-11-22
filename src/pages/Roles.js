import React, { useState } from "react";
import "../assets/styles/Roles.css";

const Roles = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      description: "Full access",
      permissions: ["Read", "Write", "Delete"],
    },
    {
      id: 2,
      name: "User",
      description: "Limited access",
      permissions: ["Read"],
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [validationError, setValidationError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (permission) => {
    setFormData((prevData) => ({
      ...prevData,
      permissions: prevData.permissions.includes(permission)
        ? prevData.permissions.filter((p) => p !== permission)
        : [...prevData.permissions, permission],
    }));
  };

  const handleEdit = (roleId) => {
    const role = roles.find((r) => r.id === roleId);
    setFormData({ ...role });
    setIsEditing(true);
    setEditId(roleId);
    setValidationError("");
  };

  const handleDelete = (roleId) => {
    setRoles((prevRoles) => prevRoles.filter((r) => r.id !== roleId));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || formData.permissions.length === 0) {
      setValidationError("All fields are required.");
      return;
    }

    if (isEditing) {
      setRoles((prevRoles) =>
        prevRoles.map((r) =>
          r.id === editId ? { ...r, ...formData } : r
        )
      );
      setIsEditing(false);
    } else {
      setRoles((prevRoles) => [
        ...prevRoles,
        { ...formData, id: Date.now() },
      ]);
    }

    setFormData({ name: "", description: "", permissions: [] });
    setEditId(null);
    setValidationError("");
  };

  return (
    <div className="role">
      <div className="rolemanagement">Role Management</div>
      <form onSubmit={handleFormSubmit} className="role-form">
        <input
          type="text"
          name="name"  // Use name="name" for the role name
          value={formData.name}
          placeholder="Enter Role Name"
          onChange={handleInputChange}
          className="input-field"
        />
        <input
          type="text"
          name="description"  // Use name="description" for the role description
          value={formData.description}
          placeholder="Enter Description"
          onChange={handleInputChange}
          className="input-field"
        />
        <div className="permissions">
          <label>
            <input
              type="checkbox"
              checked={formData.permissions.includes("Read")}
              onChange={() => handleCheckboxChange("Read")}
            />
            Read
          </label>
          <label>
            <input
              type="checkbox"
              checked={formData.permissions.includes("Write")}
              onChange={() => handleCheckboxChange("Write")}
            />
            Write
          </label>
          <label>
            <input
              type="checkbox"
              checked={formData.permissions.includes("Delete")}
              onChange={() => handleCheckboxChange("Delete")}
            />
            Delete
          </label>
        </div>
        <button type="submit" className="btn-submit">
          {isEditing ? "Update Role" : "Add Role"}
        </button>
      </form>

      {validationError && <div className="validation-error">{validationError}</div>}

      <table className="role-table">
        <thead>
          <tr>
            <th>Name</th>
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
                <button onClick={() => handleEdit(role.id)} className="action-btn edit">
                  Edit
                </button>
                <button onClick={() => handleDelete(role.id)} className="action-btn delete">
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

export default Roles;
