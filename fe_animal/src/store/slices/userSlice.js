import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";

const initialState = {
  loading: "idle",
  page: 0,
  take: 25,
  list: [],
  current: null,
  error: "",
  total: 0,
};

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async ({ searchString, page, take }, { rejectWithValue }) => {
    const res = await userApi.get(searchString, page, take).catch((e) => {
      if (e.response.status === 400)
        throw rejectWithValue(e.response.data.message[0]);
      throw rejectWithValue(e.response.data.message);
    });
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    selectUser: (state, action) => {
      state.current = action.payload;
    },
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = "loading";
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = "error";
      state.error = action.payload;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.list = action.payload.records;
      state.total = action.payload.count;
    },
  },
});

export const { selectUser } = userSlice.actions;
export default userSlice.reducer;
