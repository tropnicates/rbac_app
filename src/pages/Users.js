import React, { useState } from "react";
import UserTable from "../components/UserTable";
import Modal from "../components/Modal";
import "./user.css";

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "User", status: "Inactive" }
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (userId) => {
    const user = users.find(u => u.id === userId);
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const handleModalSubmit = (userData) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userData } : u));
    } else {
      setUsers([...users, { ...userData, id: Date.now(), status: "Active" }]);
    }
    setModalOpen(false); 
    setEditingUser(null);
  };

  const handleAddUser = () => {
    setEditingUser(null); 
    setModalOpen(true); 
  };

  return (
    <div className="users">
      <div className="usermanagement">User Management</div>
      <button onClick={handleAddUser} className="btn-add">Add User</button>
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
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
