import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const categorySlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});
const { reducer: productReducer, actions } = categorySlice;

export const { setProducts } = actions;
export default productReducer;
