import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { req } from "../../utils/request";
import { toast } from "react-toastify";

export const getUser = createAsyncThunk('profile/getUser', async (id, { rejectWithValue }) => {
  try {
    const { data } = await req.get(`api/users/profile/${id}`);
    return data;

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.profile = action.payload;
    })
  }
})

export const { logout, clearSignUpMessage } = profileSlice.actions;
export default profileSlice.reducer;