import { toast } from "react-toastify";
import {
  createNewCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../axios/categoryAxios";
import { setIsLoading } from "../helperRedux.js/helperSlice";
import { setCategories } from "./categorySlice";

// create category
export const createNewCategoryAction = (formData) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const result = await createNewCategory(formData);
  if (result.status === "error") {
    dispatch(setIsLoading(false));
    return toast.error(result.message);
  }
  if (result.status === "success") {
    dispatch(setIsLoading(false));
    toast.success(result.message);
    dispatch(getCategoriesAction());
    return;
  }
  dispatch(setIsLoading(false));
};

// get category
export const getCategoriesAction = () => async (dispatch) => {
  const result = await getCategories();
  if (result.status === "error") {
    return toast.error(result.message);
  }
  dispatch(setCategories(result.data));
};

// update category
export const updateCategoryAction =
  (categoryId, formData) => async (dispatch) => {
    dispatch(setIsLoading(true));
    const result = await updateCategory(categoryId, formData);
    if (result.status === "error") {
      dispatch(setIsLoading(false));
      return toast.error(result.message);
    }
    if (result.status === "success") {
      toast.success(result.message);
      dispatch(setIsLoading(false));
      dispatch(getCategoriesAction());
    }
    return result;
  };

//   handle on delete
export const deleteCategoryAction = (id) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const result = await deleteCategory(id);

  if (result.status === "error") {
    dispatch(setIsLoading(false));
    return toast.error(result.message);
  }
  if (result.status === "success") {
    toast.success(result.message);
    dispatch(setIsLoading(false));
    dispatch(getCategoriesAction());
  }
};
