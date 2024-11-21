import React, { useState } from "react";
import RoleTable from "../components/RoleTable";
import Modal from "../components/Modal";
import "./Roles.css"

const Roles = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", description: "Full access", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "User", description: "Limited access", permissions: ["Read"] }
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const handleEdit = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    setEditingRole(role);
    setModalOpen(true);
  };

  const handleDelete = (roleId) => {
    setRoles(roles.filter(r => r.id !== roleId));
  };

  const handleModalSubmit = (roleData) => {
    if (editingRole) {
      setRoles(roles.map(r => r.id === editingRole.id ? { ...r, ...roleData } : r));
    } else {
      setRoles([...roles, { ...roleData, id: Date.now() }]);
    }
  };

  return (
    <div>
      <div className="role">Role Management</div>
      <RoleTable roles={roles} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        data={editingRole}
        type="Role"
      />
    </div>
  );
};

export default Roles;
