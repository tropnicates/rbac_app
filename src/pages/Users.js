import React, { useState } from "react";
import UserTable from "../components/UserTable";
import Modal from "../components/Modal";
import { validateUserInput, validateRoleInput } from "../utils/validateInputs";  
import "../assets/styles/users.css";

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Ravish Kumar", email: "raivsh@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Mohit Mahto", email: "mohit@example.com", role: "User", status: "Inactive" }
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [validationError, setValidationError] = useState(""); 

  const handleEdit = (userId) => {
    const user = users.find(u => u.id === userId);
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const handleModalSubmit = (userData) => {
    const validation = validateUserInput(userData);
    if (!validation.isValid) {
      setValidationError(validation.message); 
      return; 
    }

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userData } : u));
    } else {
      setUsers([...users, { ...userData, id: Date.now(), status: "Active" }]);
    }
    setModalOpen(false);
    setEditingUser(null);
    setValidationError(""); 
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setModalOpen(true);
    setValidationError("");
  };

  return (
    <div>
      <div className="users">User Management</div>
      <button onClick={handleAddUser} className="btn-add">Add User</button>
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      
      {validationError && <div className="validation-error">{validationError}</div>}
      
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        data={editingUser}
        type="User"
      />
    </div>
  );
};

export default Users;
