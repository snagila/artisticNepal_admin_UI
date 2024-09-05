import axios from "axios";

const PRODUCT_BASE_URL = `${
  import.meta.env.VITE_APP_ADMIN_API_URL
}/api/product`;

const accessJWT = sessionStorage.getItem("accessJWT");

// create new product
export const createNewProduct = async (formObject) => {
  try {
    const response = await axios.post(PRODUCT_BASE_URL, formObject, {
      headers: { Authorization: accessJWT },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

// get all products
export const getProduct = async () => {
  try {
    const response = await axios.get(PRODUCT_BASE_URL, {
      headers: { Authorization: accessJWT },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

// delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${PRODUCT_BASE_URL}/${id}`, {
      headers: { Authorization: accessJWT },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

// edit product
export const editProduct = async (formObject, id, existingImages) => {
  try {
    console.log(...formObject.entries());
    const response = await axios.patch(
      `${PRODUCT_BASE_URL}/edit-product/${id}`,
      { formObject, existingImages },
      {
        headers: { Authorization: accessJWT },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
