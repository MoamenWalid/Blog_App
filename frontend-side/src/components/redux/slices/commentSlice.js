
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { req } from "../../utils/request";
import { toast } from "react-toastify";

export const createComment = createAsyncThunk('category/createComment', async ({ postId, text }, { rejectWithValue, getState, dispatch }) => {
  try {
    await req.post(`api/comments`, { postId, text }, {
      headers: {
        Authorization: `Bearer ${getState().auth.user.token}`,
      },
    });

    toast.success('Create comment successfully');
    dispatch(getCommentsPerPostId(postId));

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

export const getAllComments = createAsyncThunk('category/getAllComments', async (_, { rejectWithValue, getState }) => {
  try {
    const { data } = await req.get('api/comments', {
      headers: {
        Authorization: `Bearer ${getState().auth.user.token}`,
      },
    });

    return data;

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

export const getCommentsPerPostId = createAsyncThunk('category/getCommentsPerPostId', async (id, { rejectWithValue }) => {
  try {
    const { data } = await req.get(`api/comments/${ id }`);
    return data;

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

export const editComment = createAsyncThunk('category/editComment', async ({ postId, commentId, text }, { rejectWithValue, getState, dispatch }) => {
  try {
    await req.patch(`api/comments/${ commentId }`, { text }, {
      headers: {
        Authorization: `Bearer ${getState().auth.user.token}`,
      },
    });

    toast.success('Update comment successfully');
    dispatch(getCommentsPerPostId(postId));

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

export const deleteComment = createAsyncThunk('category/deleteComment', async ({ postId, commentId }, { rejectWithValue, getState, dispatch }) => {
  try {
    await req.delete(`api/comments/${ commentId }`, {
      headers: {
        Authorization: `Bearer ${getState().auth.user.token}`,
      },
    });

    dispatch(getCommentsPerPostId(postId));

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    commentsPerPostId: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    })

    builder.addCase(getCommentsPerPostId.pending, (state) => {
      state.loading = true;
    })

    builder.addCase(getCommentsPerPostId.fulfilled, (state, action) => {
      state.loading = false;
      state.commentsPerPostId = action.payload;
    })
  }
})

export default commentSlice.reducer;