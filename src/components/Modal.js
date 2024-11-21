import React, { useState, useEffect } from "react";
import "./modal.css"
const Modal = ({ isOpen, onClose, onSubmit, data, type }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active"
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        email: data.email,
        role: data.role,
        status: data.status
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({ name: "", email: "", role: "User", status: "Active" }); // Reset form after submit
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="edit-btn">{data ? `Edit ${type}` : `Add ${type}`}</div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Role</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>{data ? "Update" : "Add"}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
