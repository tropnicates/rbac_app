export const formatPermissions = (permissions) => {
  return permissions.map((permission) => {
    return {
      ...permission,
      granted: permission.granted === true || permission.granted === "true",
    };
  });
};
