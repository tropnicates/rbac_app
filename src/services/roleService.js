const API_URL = "http://localhost:5000/api/roles";

export const getRoles = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching roles:", error);
  }
};

export const addRole = async (roleData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roleData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding role:", error);
  }
};



export const updateRole = async (roleId, roleData) => {
  try {
    const response = await fetch(`${API_URL}/${roleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roleData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating role:", error);
  }
};

export const deleteRole = async (roleId) => {
  try {
    const response = await fetch(`${API_URL}/${roleId}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.error("Error deleting role:", error);
  }
};
