
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

    toast.success('Create post successfully');
    dispatch(getComments(postId));

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

export const getComments = createAsyncThunk('category/createComment', async (id, { rejectWithValue }) => {
  try {
    const { data } = await req.get(`api/comments/${ id }`);

    return data;

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})



const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state) => {
      state.loading = true;
    })

    builder.addCase(getComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    })
  }
})

export default commentSlice.reducer;