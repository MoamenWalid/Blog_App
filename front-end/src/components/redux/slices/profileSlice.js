import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { req } from "../../utils/request";
import { toast } from "react-toastify";
import { setUserPhoto, setUsername } from "./authSlice";

export const getUser = createAsyncThunk('profile/getUser', async (id, { rejectWithValue }) => {
  try {
    const { data } = await req.get(`api/users/profile/${id}`);
    return data;

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

export const updateProfile = createAsyncThunk('profile/updateProfile', async (profile, { rejectWithValue, getState, dispatch }) => {
  try {
    const state = getState().profile.profile;
    const finishDataOfUser = {};

    // Prepare new data to send it to server
    for (let [key, value] of Object.entries(profile)) {
      if (key == 'photo' && value !== state.profilePhoto.url) {
        const formData = new FormData();
  
        // Transform Blob to file Object
        const response = await fetch(profile.photo);
        const blob = await response.blob();
        const file = new File([blob], "profile-photo.jpg", { type: blob.type });
  
        formData.append("image", file);
  
        const { data } = await req.post(`api/users/profile/profile-photo-upload`, formData, {
          headers: {
            Authorization: `Bearer ${getState().auth.user.token}`,
            "Content-Type": "multipart/form-data"
          }
        });
        
        dispatch(setUserPhoto(data.profilePhoto));
        toast.success(data.message);
        if (localStorage.getItem('userInfo') && data) {
          const user = JSON.parse(localStorage.getItem('userInfo'));
          user.profilePhoto = data.profilePhoto;
          localStorage.setItem('userInfo', JSON.stringify(user));
        }

      }

      else if (key !== 'photo' && value !== state[`${key}`]) {
        if (localStorage.getItem('userInfo') && key == 'username') {
          dispatch(setUsername(value));
          const user = JSON.parse(localStorage.getItem('userInfo'));
          user.username = value;
          localStorage.setItem('userInfo', JSON.stringify(user));
        }

        finishDataOfUser[`${key}`] = value;
      }
    }
    
    if (Object.keys(finishDataOfUser).length) {
      const { data } = await req.patch(`api/users/profile/${ state._id }`, finishDataOfUser, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
        }
      });

      toast.success(data.message);
    }

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
});


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

    // builder.addCase(updateProfile.fulfilled, (state, action) => {
    //   state.profile = action.payload;
    // })
  }
})

export const { logout, clearSignUpMessage } = profileSlice.actions;
export default profileSlice.reducer;