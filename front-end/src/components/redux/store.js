import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import profileReducer from './slices/profileSlice.js';
import postReducer from './slices/postSlice.js';
import categoryReducer from './slices/categorySlice.js';
import commentReducer from './slices/commentSlice.js';
import userReducer from './slices/userSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    profile: profileReducer,
    post: postReducer,
    category: categoryReducer,
    comment: commentReducer,
  }
})


export default store;