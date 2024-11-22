export const formatPermissions = (permissions) => {
  return permissions.map((permission) => ({
    ...permission,
    granted: permission.granted === true || permission.granted === "true",
  }));
};

export const formatUserData = (userData) => ({
  ...userData,
  name: userData.name.trim(),
  email: userData.email.trim().toLowerCase(),
  role: userData.role || "User",
  status: userData.status || "Active",
});

export const formatRoleData = (roleData) => ({
  ...roleData,
  name: roleData.name.trim(),
  description: roleData.description.trim(),
  permissions: Array.isArray(roleData.permissions)
    ? [...new Set(roleData.permissions)]
    : [],
});
