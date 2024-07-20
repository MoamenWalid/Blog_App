import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import profileReducer from './slices/profileSlice.js';
import postReducer from './slices/postSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    post: postReducer
  }
})


export default store;