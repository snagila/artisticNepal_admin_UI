import { toast } from "react-toastify";
import {
  createNewProduct,
  deleteProduct,
  editProduct,
  getProduct,
} from "../../axios/productAxios";
import { setProducts } from "./productSlice";
import { setIsLoading } from "../helperRedux.js/helperSlice";

// create product
export const createNewProductAction = (formObject) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const result = await createNewProduct(formObject);

  if (result.status === "error") {
    dispatch(setIsLoading(false));
    toast.error(error.message);
    return;
  }
  if (result.status === "success") {
    toast.success(result.message);
    dispatch(setIsLoading(false));
    dispatch(getProductsAction());
    return result;
  }
};

// get products
export const getProductsAction = () => async (dispatch) => {
  const result = await getProduct();

  if (result.status === "error") {
    toast.error(result.message);
    return;
  }
  if (result.status === "success") {
    dispatch(setProducts(result.data));
  }
};

// delete a product
export const deleteProductActions = (product) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const result = await deleteProduct(product);

  if (result.status === "error") {
    dispatch(setIsLoading(false));
    toast.error(result.message);
    return;
  }
  if (result.status === "success") {
    dispatch(setIsLoading(false));
    dispatch(getProductsAction());
    return result;
  }
  toast.error("Something went wrong. Plaese try later.");
  dispatch(setIsLoading(false));
};

// edit product
export const editProductAction = (formObject, id) => async (dispatch) => {
  const result = await editProduct(formObject, id);

  if (result.status === "error") {
    dispatch(setIsLoading(false));
    toast.error(error.message);
    return;
  }
  if (result.status === "success") {
    toast.success(result.message);
    dispatch(setIsLoading(false));
    dispatch(getProductsAction());
    return result;
  }
  toast.error("Something went wrong. Plaese try later.");
  dispatch(setIsLoading(false));
};
