import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem('userInfo') ? 
      JSON.parse(localStorage.getItem('userInfo')) : null
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    }
  }
})

export const { login } = authSlice.actions;
export default authSlice.reducer;