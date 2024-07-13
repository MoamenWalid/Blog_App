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

export const updateProfile = createAsyncThunk('profile/updateProfile', async (profile, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    if (profile.photo !== state.profile.profile.profilePhoto.url) {

      const formData = new FormData();
      formData.append("image", profile.photo);

      const { data } = await req.post(`api/users/profile/profile-photo-upload`,formData, {
        headers: {
          Authorization: `Bearer ${state.auth.user.token}`,
          "Content-Type": "multipart/form-data"
        }
      })

      toast.success(data.message);
    }

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