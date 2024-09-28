import { toast } from "react-toastify";
import { getOrders } from "../../axios/orderAxios";
import { setOrders } from "./orderSlice";

export const getOrdersActions = () => async (dispatch) => {
  const result = await getOrders();

  if (result.status === "error") {
    toast.error(error.message);
  }
  dispatch(setOrders(result.data));
};
