import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pictureApi } from "../../api/pictureApi";

export const adminCreatePicture = createAsyncThunk(
  "pictures/AdminCreate",
  async (formdata, { rejectWithValue }) => {
    const response = await pictureApi.adminCreate(formdata).catch((e) => {
      if (e.response.status === 400)
        throw rejectWithValue(e.response.data.message[0]);
      throw rejectWithValue(e.response.data.message);
    });
    return response.data;
  }
);

export const getPicutres = createAsyncThunk(
  "pictures/get",
  async ({ tagIds, page, take }, { rejectWithValue, dispatch }) => {
    dispatch(savePageData({ tagIds, page, take }));
    const response = await pictureApi.get(tagIds, page, take).catch((e) => {
      if (e.response.status === 400)
        throw rejectWithValue(e.response.data.message[0]);
      throw rejectWithValue(e.response.data.message);
    });
    return response.data;
  }
);

export const deletePicture = createAsyncThunk(
  "pictures/delete",
  async (id, { rejectWithValue }) => {
    const response = await pictureApi.delete(id).catch((e) => {
      if (e.response.status === 400)
        throw rejectWithValue(e.response.data.message[0]);
      throw rejectWithValue(e.response.data.message);
    });
    return response.data;
  }
);

export const updateInfoPicture = createAsyncThunk(
  "pictures/update",
  async ({ id, data }, { rejectWithValue }) => {
    const res = await pictureApi.updateInfo(id, data).catch((e) => {
      if (e.response.status === 400)
        throw rejectWithValue(e.response.data.message[0]);
      throw rejectWithValue(e.response.data.message);
    });
    return res.data;
  }
);

const initialState = {
  loading: "idle",
  current: null,
  error: "",
  page: 0,
  take: 25,
  total: 0,
  tagIds: [],
  list: [],
};

const pictureSlice = createSlice({
  name: "picture",
  initialState: initialState,
  reducers: {
    selectPicture: (state, action) => {
      state.current = action.payload;
    },
    savePageData: (state, action) => {
      state.page = action.payload.page;
      state.take = action.payload.take;
      state.tagIds = action.payload.tagIds;
    },
  },
  extraReducers: {
    [getPicutres.pending]: (state) => {
      state.loading = "loading";
    },
    [getPicutres.rejected]: (state, action) => {
      state.loading = "error";
      state.error = action.payload;
    },
    [getPicutres.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.list = action.payload.records;
      state.total = action.payload.count;
    },
    [adminCreatePicture.pending]: (state) => {
      state.loading = "loading";
    },
    [adminCreatePicture.rejected]: (state, action) => {
      console.log(action);
      state.loading = "error";
      state.error = action.payload;
    },
    [adminCreatePicture.fulfilled]: (state, action) => {
      state.loading = "success";
      state.list.push(action.payload);
    },
    [deletePicture.pending]: (state) => {
      state.loading = "loading";
    },
    [deletePicture.rejected]: (state, action) => {
      state.loading = "error";
      state.error = action.payload;
    },
    [deletePicture.fulfilled]: (state, action) => {
      state.loading = "success";
      state.list = state.list.filter(({ id }) => id !== action.payload.id);
    },
    [updateInfoPicture.pending]: (state) => {
      state.loading = "loading";
    },
    [updateInfoPicture.rejected]: (state, action) => {
      state.loading = "error";
      state.error = action.payload;
    },
    [updateInfoPicture.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loading = "success";
      const index = state.list.findIndex((t) => t.id === action.payload.id);
      state.list[index] = action.payload;
      state.current = action.payload;
    },
  },
});

export const { selectPicture, savePageData } = pictureSlice.actions;

export default pictureSlice.reducer;
