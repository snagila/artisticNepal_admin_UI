import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});
const { reducer: orderReducer, actions } = orderSlice;

export const { setOrders } = actions;
export default orderReducer;
