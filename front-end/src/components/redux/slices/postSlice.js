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

export const getPostsBerCategory = createAsyncThunk('post/getPostsBerCategory', async (category, { rejectWithValue }) => {
  try {
    const { data } = await req.get(`api/posts?category=${category || ''}`);
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
    postsBerPage: {
      posts: [],
      loading: false,
      currentPage: 1,
      postsCount: null
    },

    postsBerCategory: {
      posts: [],
      loading: false,
      currentPage: 1,
      postsCount: null
    }
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload
    },
    setCurrentPage(state) {
      state.postsBerPage.currentPage++;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPostsBerPage.pending, (state) => {
      state.postsBerPage.loading = true;
    })

    builder.addCase(getPostsBerPage.fulfilled, (state, action) => {
      state.postsBerPage.loading = false;
      state.postsBerPage.posts  = [...state.postsBerPage.posts, ...action.payload];
    })

    builder.addCase(getPostsCount.fulfilled, (state, action) => {
      state.postsCount = action.payload;
    })
  }
})

export const { setPosts, setCurrentPage } = postSlice.actions;
export default postSlice.reducer;