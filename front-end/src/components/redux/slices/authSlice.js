import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { req } from "../../utils/request";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk('auth/login', async (user, { rejectWithValue }) => {
  try {
    const { data } = await req.post("api/auth/login", user);
    return data;

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

export const signUpUser = createAsyncThunk('auth/signUp', async (user, { rejectWithValue }) => {
  try {
    const { username, email, password } = user;
    const { data } = await req.post("api/auth/register", { username, email, password });
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    signUpMessage: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem('userInfo');
    },
    clearSignUpMessage(state) {
      state.signUpMessage = null
    }
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    })

    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.signUpMessage = action.payload.message  ;
    })
  }
})

export const { logout, clearSignUpMessage } = authSlice.actions;
export default authSlice.reducer;