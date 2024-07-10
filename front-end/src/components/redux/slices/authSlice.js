import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { req } from "../../utils/request";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk('authSlice/login', async(user, { rejectWithValue }) => {
  try {
    const { data } = await req.post("api/auth/login", user);
    return data;

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null 
  },
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem('userInfo');
    }
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    })
  }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;