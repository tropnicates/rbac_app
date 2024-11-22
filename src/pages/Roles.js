import React, { useState } from "react";
import RoleTable from "../components/RoleTable";
import Modal from "../components/Modal";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const handleEdit = (roleId) => {
    const role = roles.find((r) => r.id === roleId);
    setEditingRole(role);
    setModalOpen(true);
  };

  const handleDelete = (roleId) => {
    setRoles((prevRoles) => prevRoles.filter((r) => r.id !== roleId));
  };

  const handleModalSubmit = (roleData) => {
    setRoles((prevRoles) =>
      editingRole
        ? prevRoles.map((r) =>
            r.id === editingRole.id ? { ...r, ...roleData } : r
          )
        : [...prevRoles, { ...roleData, id: Date.now() }]
    );
    setModalOpen(false);
    setEditingRole(null);
  };

  return (
    <div className="roles-container">
      <h2 className="roles-header">Role Management</h2>
      <RoleTable roles={roles} onEdit={handleEdit} onDelete={handleDelete} />
      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleModalSubmit}
          data={editingRole}
          type="Role"
        />
      )}
    </div>
  );
};

export default Roles;
