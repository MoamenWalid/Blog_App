import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    }
  }
})

export const { login } = authSlice.actions;
export const authReducer = authSlice.reducer;