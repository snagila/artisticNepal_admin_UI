import { configureStore } from "@reduxjs/toolkit";
import helperReducer from "./helperRedux.js/helperSlice";
import adminReducer from "./adminRedux/adminSlice";
import categoryReducer from "./categoryRedux/categorySlice";
import productReducer from "./productRedux/productSlice";

const store = configureStore({
  reducer: {
    helper: helperReducer,
    admin: adminReducer,
    category: categoryReducer,
    product: productReducer,
  },
});
export default store;
