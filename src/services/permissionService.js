const API_URL = "http://localhost:5000/api/permissions";

export const getPermissions = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching permissions:", error);
  }
};

export const addPermission = async (permissionData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(permissionData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding permission:", error);
  }
};

export const updatePermission = async (permissionId, permissionData) => {
  try {
    const response = await fetch(`${API_URL}/${permissionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(permissionData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating permission:", error);
  }
};

export const deletePermission = async (permissionId) => {
  try {
    const response = await fetch(`${API_URL}/${permissionId}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.error("Error deleting permission:", error);
  }
};
