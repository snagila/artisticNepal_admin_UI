import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: {},
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
});

const { reducer: adminReducer, actions } = adminSlice;

export const { setAdmin } = actions;
export default adminReducer;
