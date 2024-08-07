import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { req } from "../../utils/request";
import { toast } from "react-toastify";

// Async thunk to get users
export const getAllUsers = createAsyncThunk("profile/getAllUsers", async (_, { rejectWithValue, getState }) => {
    try {
      const { data } = await req.get(`api/users/profile`, {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`
        }
      });

      // console.log(data);

      return data;

    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Async thunk to get single user
export const getSingleUser = createAsyncThunk('category/getSingleUser', async (id, { rejectWithValue }) => {
  try {
    const {data} = await req.get(`users/profile/${id}`);
    
    console.log(data);

    toast.success('Create post successfully');

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
})

// Change status of member
export const changeStatusOfMember = createAsyncThunk("profile/changeStatusOfMember", async ({ id, status }, { rejectWithValue, getState, dispatch }) => {
  try {
    const { data } = await req.patch(`admin-dashboard/users/${id}`, { isAdmin: status }, {
      headers: {
        Authorization: `Bearer ${getState().auth.user.token}`
      }
    });

    toast.success(data.message);
    dispatch(getAllUsers());
    return data;

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
}
);

// Change status of member
export const deleteMember = createAsyncThunk("profile/deleteMember", async (id, { rejectWithValue, getState, dispatch }) => {
  try {
    const { data } = await req.delete(`api/users/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${getState().auth.user.token}`
      }
    });

    toast.success(data.message);
    dispatch(getAllUsers());
    return data;

  } catch (error) {
    toast.error(error.response.data.message);
    return rejectWithValue(error.response.data.message);
  }
}
);

// Profile slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: {},
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.users = [];
      state.loading = true;
    })

    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    })
  },
});

export default userSlice.reducer;
