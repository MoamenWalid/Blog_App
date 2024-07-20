import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { req } from "../../utils/request";
import { toast } from "react-toastify";

export const getPosts = createAsyncThunk('post/getPosts', async (page, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await req.get(`api/posts${ page && `?page=${page}` }`);
    dispatch(setPosts(data));

  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    postsCount: null,
    postsCat: []
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload
    },
    setPostsCount(state, action) {
      state.postsCount = action.payload
    },
    setPostsCat(state, action) {
      state.postsCat = action.payload
    },
  },
  extraReducers: (builder) => {}
})

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;