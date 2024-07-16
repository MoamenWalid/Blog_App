import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { req } from "../../utils/request";
import { toast } from "react-toastify";
import { setUserPhoto, setUsername } from "./authSlice";

// Async thunk to get user profile
export const getUser = createAsyncThunk(
  "profile/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await req.get(`api/users/profile/${id}`);
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk to update user profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profile, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState().profile.profile;
      const updates = {};

      // Handle photo update
      if (profile.photo && profile.photo !== state.profilePhoto.url) {
        const formData = new FormData();
        const response = await fetch(profile.photo);
        const blob = await response.blob();
        formData.append(
          "image",
          new File([blob], `profile-photo.${blob.type.split("/")[1]}`, {
            type: blob.type,
          })
        );

        const { data } = await req.post(
          `api/users/profile/profile-photo-upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${getState().auth.user.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        dispatch(setUserPhoto(data.profilePhoto));
        toast.success(data.message);

        // userInfo to localstorage
        const user = JSON.parse(localStorage.getItem("userInfo"));
        user.profilePhoto = data.profilePhoto;
        localStorage.setItem("userInfo", JSON.stringify(user));
      }

      // Handle other profile updates
      Object.keys(profile).forEach((key) => {
        if (key !== "photo" && profile[key] !== state[key]) {
          updates[key] = profile[key];
          if (key === "username") {
            dispatch(setUsername(profile[key]));
            const user = JSON.parse(localStorage.getItem("userInfo"));
            user.username = profile[key];
            localStorage.setItem("userInfo", JSON.stringify(user));
          }
        }
      });

      // Update profile if there are changes
    if (Object.keys(updates).length) {
        const { data } = await req.patch(
          `api/users/profile/${state._id}`,
          updates,
          {
            headers: { Authorization: `Bearer ${getState().auth.user.token}` },
          }
        );
        toast.success(data.message);
      } else if (profile.photo === state.profilePhoto.url) {
        toast.error("You try update same data!!");
      }

      // Update profile state
      dispatch(updateProfileState(updates));
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Profile slice
const profileSlice = createSlice({
  name: "profile",
  initialState: { profile: null },
  reducers: {
    updateProfileState(state, action) {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export const { updateProfileState } = profileSlice.actions;
export default profileSlice.reducer;
