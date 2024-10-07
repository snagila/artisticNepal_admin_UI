import { toast } from "react-toastify";

import { setAdmin } from "./adminSlice";
import { getAdmin, getNewAccessJWT, logoutAdmin } from "../../axios/adminAxios";

// get admin user
export const getAdminAction = () => async (dispatch) => {
  if (!sessionStorage.getItem("accessJWT")) {
    return;
  }

  const result = await getAdmin();
  if (result?.status === "error") {
    toast.error(result.message);
    return;
  }
  dispatch(setAdmin(result.data));
};

// auto login
export const autoLoginAction = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");

  //   if no tokens do nothing
  if (!accessJWT && !refreshJWT) {
    return;
  }
  if (!accessJWT && refreshJWT) {
    const result = await getNewAccessJWT(refreshJWT);

    if (result?.data) {
      sessionStorage.removeItem("accessJWT");
      sessionStorage.setItem("accessJWT", result.data);

      dispatch(getAdminAction());
      return;
    }
  }
};

// logout admin
export const logoutAdminAction = (email) => async (dispatch) => {
  const result = await logoutAdmin(email);
  console.log(result);
  if (result?.status === "error") {
    toast.error(result.message);
    return;
  }
  if (result?.status === "success") {
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("refreshJWT");
    dispatch(setAdmin({}));
  }
};
