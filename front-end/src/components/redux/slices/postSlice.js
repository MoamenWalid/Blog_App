import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { req } from "../../utils/request";
import { toast } from "react-toastify";

export const createPost = createAsyncThunk('post/createPost', async ({ image, title, category, description }, { rejectWithValue, getState }) => {
  try {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);

    await req.post('api/posts', formData, {
      headers: {
        Authorization: `Bearer ${getState().auth.user.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

export const getPosts = createAsyncThunk('post/getPosts', async (page, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await req.get(`api/posts${ page && `?page=${page}` }`);
    dispatch(setPosts(data));

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

export const getSinglePost = createAsyncThunk('post/getSinglePost', async (id, { rejectWithValue }) => {
  try {
    const { data } = await req.get(`api/posts/${id}`);
    return data;

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

export const getPostsPerCategory = createAsyncThunk('post/getPostsPerCategory', async ({ page, category }, { rejectWithValue }) => {
  try {
    const { data } = await req.get(`api/posts?page=${page}&category=${category}`);
    return data;

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

export const getPostsCount = createAsyncThunk('post/getPostsCount', async (category, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await req.get(`api/posts/count?category=${ category }`);
    if (!category) dispatch(setPostsCount(data.count));
    else dispatch(setPostsCategoryLength(data.count));

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    loading: false,
    singlePost: {
      post: {},
      loading: false
    },
    createSinglePost: {
      loading: false
    },
    postsBerPage: {
      posts: [],
      loading: false,
      currentPage: 1,
      postsCount: null
    },
    postsPerCategory: {
      posts: [],
      loading: false,
      postsLength: null
    },
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },

    setPostsCount(state, action) {
      state.postsBerPage.postsCount = action.payload;
    },
    
    setPostsCategoryLength(state, action) {
      state.postsPerCategory.postsLength = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.createSinglePost.loading = true;
    })

    builder.addCase(createPost.fulfilled, (state) => {
      state.createSinglePost.loading = false;
    })

    builder.addCase(createPost.rejected, (state) => {
      state.createSinglePost.loading = false;
    })

    builder.addCase(getSinglePost.pending, (state) => {
      state.singlePost.post = {};
      state.singlePost.loading = true; 
    })

    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.singlePost.post = action.payload;
      state.singlePost.loading = false;
    })

    builder.addCase(getSinglePost.rejected, (state) => {
      state.singlePost.loading = false;
    })

    builder.addCase(getPostsBerPage.pending, (state) => {
      state.postsBerPage.loading = true;
    })

    builder.addCase(getPostsBerPage.fulfilled, (state, action) => {
      state.postsBerPage.posts  = [...state.postsBerPage.posts, ...action.payload];
      state.postsBerPage.currentPage++;
      state.postsBerPage.loading = false;
    })

    builder.addCase(getPostsBerPage.rejected, (state) => {
      state.postsBerPage.loading = false;
    })

    builder.addCase(getPostsPerCategory.pending, (state) => {
      state.postsPerCategory.posts  = [];
      state.postsPerCategory.loading = true;
    })

    builder.addCase(getPostsPerCategory.fulfilled, (state, action) => {
      state.postsPerCategory.posts  = action.payload;
      state.postsPerCategory.loading = false;
    })

    builder.addCase(getPostsPerCategory.rejected, (state) => {
      state.postsPerCategory.loading = false;
    })
  }
})

export const { setPosts, clearPostsCategory, setPostsCount, setPostsCategoryLength } = postSlice.actions;
export default postSlice.reducer;