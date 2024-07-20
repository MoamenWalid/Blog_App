import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { req } from "../../utils/request";
import { toast } from "react-toastify";
  
export const loginUser = createAsyncThunk('auth/loginUser', async (user, { rejectWithValue }) => {
  try {
    const { data } = await req.post("api/auth/login", user);
    return data;


  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

export const signUpUser = createAsyncThunk('auth/signUpUser', async (user, { rejectWithValue }) => {
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
    },
    setUserPhoto(state, action) {
      state.user.profilePhoto = action.payload; 
    },
    setUsername(state, action) {
      state.user.username = action.payload;
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

export const { logout, clearSignUpMessage, setUserPhoto, setUsername } = authSlice.actions;
export default authSlice.reducer;