import React, { useState, useEffect } from "react";

const Modal = ({ isOpen, onClose, onSubmit, data, type }) => {
  const [formData, setFormData] = useState({
    name: "",
    permissions: ["Read"]
  });

  useEffect(() => {
    if (data) {
      setFormData({ name: data.name, permissions: data.permissions });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (permission) => {
    setFormData((prevData) => {
      const updatedPermissions = prevData.permissions.includes(permission)
        ? prevData.permissions.filter((p) => p !== permission)
        : [...prevData.permissions, permission];
      return { ...prevData, permissions: updatedPermissions };
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{data ? `Edit ${type}` : `Add ${type}`}</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Role Name"
        />
        <div className="permissions-checkboxes">
          {["Read", "Write", "Delete"].map((permission) => (
            <label key={permission} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.permissions.includes(permission)}
                onChange={() => handleCheckboxChange(permission)}
              />
              {permission}
            </label>
          ))}
        </div>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  ) : null;
};

export default Modal;
