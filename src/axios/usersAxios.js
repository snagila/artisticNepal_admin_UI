import axios from "axios";
const USER_API_URL = `${import.meta.env.VITE_APP_ADMIN_API_URL}/api/user`;

// get all user
export const getAllUser = async () => {
  try {
    const response = await axios.get(USER_API_URL, {
      headers: { Authorization: sessionStorage?.getItem("accessJWT") },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

// edit user Details
export const editUser = async (formdata) => {
  try {
    const response = await axios.post(
      `${USER_API_URL}/${formdata._id}`,
      formdata,
      {
        headers: { Authorization: sessionStorage?.getItem("accessJWT") },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

// delete user
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${USER_API_URL}/${userId}`, {
      headers: { Authorization: sessionStorage?.getItem("accessJWT") },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
