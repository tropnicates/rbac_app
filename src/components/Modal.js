import React, { useState } from "react"; 
import "../assets/styles/modal.css"

const Modal = ({ isOpen, onClose, onSubmit, data, type }) => {
  const [roleData, setRoleData] = useState(data || { name: "" });

  const handleInputChange = (e) => {
    setRoleData({ ...roleData, name: e.target.value });
  };

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
      <div className="modal-container">
        <div className="modal-header">Update {type} </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(roleData);
          }}
        >
          <input
            type="text"
            placeholder="Role Name"
            value={roleData.name || ""}
            onChange={handleInputChange}
          />
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
