import axios from "axios";

const ORDER_API_URL = `${import.meta.env.VITE_APP_ADMIN_API_URL}/api/order`;

// get all orders
export const getOrders = async () => {
  try {
    const response = await axios.get(ORDER_API_URL, {
      headers: { Authorization: sessionStorage?.getItem("accessJWT") },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
