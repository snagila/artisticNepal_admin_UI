import axios from "axios";

const CATEGORY_API_URL = `${
  import.meta.env.VITE_APP_ADMIN_API_URL
}/api/category`;

// create new categories
export const createNewCategory = async (formData) => {
  try {
    const response = await axios.post(CATEGORY_API_URL, formData, {
      headers: { Authorization: sessionStorage.getItem("accessJWT") },
    });

    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

// get all categories
export const getCategories = async () => {
  try {
    const response = await axios.get(CATEGORY_API_URL, {
      headers: { Authorization: sessionStorage.getItem("accessJWT") },
    });

    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

// update categories
export const updateCategory = async (categoryToEditId, formData) => {
  try {
    const response = await axios.patch(
      `${CATEGORY_API_URL}/${categoryToEditId}`,
      formData,
      {
        headers: { Authorization: sessionStorage.getItem("accessJWT") },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

// deleteCategory
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${CATEGORY_API_URL}/${id}`, {
      headers: { Authorization: sessionStorage.getItem("accessJWT") },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
