
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { req } from "../../utils/request";
import { toast } from "react-toastify";

export const createCategory = createAsyncThunk('category/createCategory', async (reqData, { rejectWithValue, getState, dispatch }) => {
  try {

    const { data } = await req.post(`api/categories`, reqData, {
      headers: {
        Authorization: `Bearer ${getState().auth.user.token}`,
      },
    });

    toast.success("Category has been added");
    dispatch(getCategories());
    return data;

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

export const getCategories = createAsyncThunk('category/getCategories', async (_, { rejectWithValue }) => {
  try {
    const { data } = await req.get(`api/categories`);
    return data;

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    })
  }
})

export default categorySlice.reducer;