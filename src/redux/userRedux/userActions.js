import { toast } from "react-toastify";
import {
  deleteUser,
  editUser,
  getAllUser,
  logoutUser,
} from "../../axios/usersAxios";
import { setUsers } from "./userSlice";

// get all users
export const getAllUserAction = () => async (dispatch) => {
  const result = await getAllUser();
  if (result.status === "error") {
    return toast.error(error.message);
  }
  dispatch(setUsers(result.data));
};

// edit user Details
export const editUserAction = (formData) => async (dispatch) => {
  const result = await editUser(formData);
  console.log(result);
  if (result.status === "error") {
    return toast.error(error.message);
  }
  toast.success(result.message);
  dispatch(getAllUserAction());
};

// delete user
export const deleteUserAction = (userId) => async (dispatch) => {
  const result = await deleteUser(userId);
  console.log(result);
  if (result.status === "error") {
    return toast.error(error.message);
  }
  toast.success(result.message);
  dispatch(getAllUserAction());
};

// logout user
export const logoutUserAction = (email) => async (dispatch) => {
  const result = await logoutUser(email);
  console.log(result);
};
