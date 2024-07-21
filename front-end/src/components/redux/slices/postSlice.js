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

export const getPostsLoadMore = createAsyncThunk('post/getPostsLoadMore', async (page, { rejectWithValue }) => {
  try {
    const { data } = await req.get(`api/posts?page=${page}`);
    return data;

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

export const getPostsCount = createAsyncThunk('post/getPostsCount', async (page, { rejectWithValue }) => {
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
    postsLoadMore: [],
    currentPage: 1,
    postsCount: null,
    loading: false,
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload
    },
    setCurrentPage(state) {
      state.currentPage++;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPostsLoadMore.pending, (state) => {
      state.loading = true;
    })

    builder.addCase(getPostsLoadMore.fulfilled, (state, action) => {
      state.loading = false;
      state.postsLoadMore = [...state.postsLoadMore, ...action.payload];
    })

    builder.addCase(getPostsCount.fulfilled, (state, action) => {
      state.postsCount = action.payload;
    })
  }
})

export const { setPosts, setCurrentPage } = postSlice.actions;
export default postSlice.reducer;