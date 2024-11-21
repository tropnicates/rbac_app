export const validateUserInput = (userData) => {
    const { name, email, role } = userData;
    if (!name || !email || !role) {
      return { isValid: false, message: "All fields are required." };
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: "Invalid email format." };
    }
    return { isValid: true, message: "" };
  };
  
  export const validateRoleInput = (roleData) => {
    const { name, description } = roleData;
    if (!name || !description) {
      return { isValid: false, message: "All fields are required." };
    }
    return { isValid: true, message: "" };
  };
  