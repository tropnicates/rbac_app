import React, { useState } from "react";
import PermissionList from "../components/PermissionsList";
import RoleTable from "../components/RoleTable"; 
import Modal from "../components/Modal"; 
import "../assets/styles/Permissions.css";
import "../assets/styles/Roles.css";


const Permissions = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      permissions: ["Read", "Write", "Delete"]
    },
    {
      id: 2,
      name: "Faculty",
      permissions: ["Read", "Write"]
    },
    {
      id: 3,
      name: "User",
      permissions: ["Read"]
    },
    {
      id: 4,
      name: "Sweeper",
      permissions: ["Read"]
    },
    {
      id: 5,
      name: "Dean",
      permissions: ["Read", "Write", "Delete"]
    },
    {
      id: 6,
      name: "Interpreter",
      permissions: ["Read"]
    },
    {
      id: 7,
      name: "Speaker",
      permissions: ["Read"]
    },
    {
      id: 8,
      name: "Guest",
      permissions: ["Read"]
    },
    {
      id: 9,
      name: "Contractor",
      permissions: ["Read","Write"]
    },
    {
      id: 10,
      name: "Tester",
      permissions: ["Read","Write"]
    },
  
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  const handlePermissionChange = (roleId, permission) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === roleId
          ? {
              ...role,
              permissions: role.permissions.includes(permission)
                ? role.permissions.filter((p) => p !== permission)
                : [...role.permissions, permission]
            }
          : role
      )
    );
  };

  const handleEditRole = (roleId) => {
    const role = roles.find((r) => r.id === roleId);
    setEditingRole(role);
    setModalOpen(true);
  };

  const handleDeleteRole = (roleId) => {
    setRoles((prevRoles) => prevRoles.filter((r) => r.id !== roleId));
  };

  const handleModalSubmit = (roleData) => {
    setRoles((prevRoles) =>
      editingRole
        ? prevRoles.map((role) =>
            role.id === editingRole.id ? { ...role, ...roleData } : role
          )
        : [...prevRoles, { ...roleData, id: Date.now() }]
    );
    setModalOpen(false);
    setEditingRole(null);
  };

  return (
    <div className="permissions-container">
      <div className="permissions-header">Dynamic Role Management</div>
      <RoleTable
        roles={roles}
        onEditRole={handleEditRole}
        onDeleteRole={handleDeleteRole}
      />
      <PermissionList
        roles={roles}
        onPermissionChange={handlePermissionChange}
      />
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

export default Permissions;
