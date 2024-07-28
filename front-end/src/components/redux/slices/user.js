
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { req } from "../../utils/request";
import { toast } from "react-toastify";

export const getSingleUser = createAsyncThunk('category/getSingleUser', async (id, { rejectWithValue, getState }) => {
  try {
    const {data} = await req.get(`users/profile/${id}`);
    
    console.log(data);

    toast.success('Create post successfully');

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {}
  },
  reducers: {},
  extraReducers: (builder) => {}
})

export default userSlice.reducer;