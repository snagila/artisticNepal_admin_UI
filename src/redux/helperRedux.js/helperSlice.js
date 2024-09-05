import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};
const helperSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
const { reducer: helperReducer, actions } = helperSlice;
export const { setIsLoading } = actions;
export default helperReducer;
