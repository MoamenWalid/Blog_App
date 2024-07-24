import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { req } from "../../utils/request";
import { toast } from "react-toastify";

export const getPosts = createAsyncThunk('post/getPosts', async (page, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await req.get(`api/posts${ page && `?page=${page}` }`);
    dispatch(setPosts(data));

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

export const getPostsBerPage = createAsyncThunk('post/getPostsBerPage', async (page, { rejectWithValue }) => {
  try {
    const { data } = await req.get(`api/posts?page=${page}`);
    return data;

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

export const getPostsCount = createAsyncThunk('post/getPostsCount', async (_, { rejectWithValue }) => {
  try {
    const { data } = await req.get(`api/posts/count`);
    return data.count;

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})



const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    postsBerPage: {
      posts: [],
      loading: false,
      currentPage: 1,
      postsCount: null
    },
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPostsBerPage.pending, (state) => {
      state.postsBerPage.loading = true;
    })

    builder.addCase(getPostsBerPage.fulfilled, (state, action) => {
      state.postsBerPage.loading = false;
      state.postsBerPage.posts  = [...state.postsBerPage.posts, ...action.payload];
      state.postsBerPage.currentPage++;
    })

    builder.addCase(getPostsCount.fulfilled, (state, action) => {
      state.postsBerPage.postsCount = action.payload;
    })
  }
})

export const { setPosts, clearPostsCategory } = postSlice.actions;
export default postSlice.reducer;