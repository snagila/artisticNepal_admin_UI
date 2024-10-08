import axios from "axios";

const ADMIN_API_URL = `${import.meta.env.VITE_APP_ADMIN_API_URL}/api/admin`;

// signUp new Admin
export const signUpAdmin = async (formData) => {
  try {
    const response = await axios.post(ADMIN_API_URL, formData);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

// verify admin Email
export const verifyUser = async (verifyUserObj) => {
  try {
    const response = await axios.post(
      `${ADMIN_API_URL}/verify-email`,
      verifyUserObj
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

// send reset password email
export const resetPassword = async (formData) => {
  try {
    const response = await axios.post(
      `${ADMIN_API_URL}/reset-password`,
      formData
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// newPassword change
export const newPassword = async (data) => {
  try {
    const response = await axios.post(
      `${ADMIN_API_URL}/reset-password/newpassword`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

// login admin
export const loginAdmin = async (formObj) => {
  try {
    const response = await axios.post(`${ADMIN_API_URL}/login`, formObj, {
      headers: { Authorization: sessionStorage?.getItem("accessJWT") },
    });

    return response.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

// get admin data
export const getAdmin = async () => {
  try {
    const response = await axios.get(ADMIN_API_URL, {
      headers: { Authorization: sessionStorage?.getItem("accessJWT") },
    });

    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

// autoLogin / new accessJWT from refreshJWT
export const getNewAccessJWT = async () => {
  try {
    const response = await axios.post(
      `${ADMIN_API_URL}/accessJWT`,
      {},
      {
        headers: { Authorization: localStorage.getItem("refreshJWT") },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

// logout user
export const logoutAdmin = async (email) => {
  try {
    const response = await axios.post(`${ADMIN_API_URL}/logout`, { email });
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
