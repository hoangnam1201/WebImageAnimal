import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tagAPI } from "../../api/tagApi";

const initialState = {
  current: null,
  loading: "idle",
  createLoading: false,
  list: [],
  error: "",
};

export const getTag = createAsyncThunk("tags/get", async () => {
  const response = await tagAPI.getAll();
  return response.data;
});

export const updateTagName = createAsyncThunk(
  "tags/updateName",
  async ({ tagId, name }, { rejectWithValue }) => {
    const response = await tagAPI.changeName(tagId, name).catch((e) => {
      if (e.response.status === 400)
        throw rejectWithValue(e.response.data.message[0]);
      throw rejectWithValue(e.response.data.message);
    });
    return response.data;
  }
);

export const updateImageTag = createAsyncThunk(
  "tags/updateImageName",
  async ({ tagId, formdata }, { rejectWithValue }) => {
    const response = await tagAPI.changeFile(tagId, formdata).catch((e) => {
      if (e.response.status === 400)
        throw rejectWithValue(e.response.data.message[0]);
      throw rejectWithValue(e.response.data.message);
    });
    return response.data;
  }
);

export const createTag = createAsyncThunk(
  "tags/create",
  async (formdata, { rejectWithValue }) => {
    const response = await tagAPI.create(formdata).catch((e) => {
      if (e.response.status === 400)
        throw rejectWithValue(e.response.data.message[0]);
      throw rejectWithValue(e.response.data.message);
    });
    return response.data;
  }
);

export const deleteTag = createAsyncThunk(
  "tags/delete",
  async (id, { rejectWithValue }) => {
    const response = await tagAPI.delete(id).catch((e) => {
      throw rejectWithValue(e.response.data.message);
    });
    return response.data;
  }
);

//slice
const tagSlice = createSlice({
  name: "tag",
  initialState: initialState,
  reducers: {
    selectTag: (state, action) => {
      state.current = action.payload;
    },
  },
  extraReducers: {
    [getTag.pending]: (state) => {
      state.loading = "loading";
    },
    [getTag.rejected]: (state, action) => {
      state.loading = "error";
      state.error = action.error;
    },
    [getTag.fulfilled]: (state, action) => {
      state.loading = "idle";
      state.list = action.payload;
    },
    [createTag.pending]: (state) => {
      state.createLoading = "loading";
    },
    [createTag.rejected]: (state, action) => {
      state.createLoading = "error";
      state.error = action.payload;
    },
    [createTag.fulfilled]: (state, action) => {
      state.createLoading = "success";
      state.list.push(action.payload);
    },
    [deleteTag.pending]: (state) => {
      state.loading = "loading";
    },
    [deleteTag.rejected]: (state, action) => {
      state.loading = "error";
      state.error = action.payload;
    },
    [deleteTag.fulfilled]: (state, action) => {
      state.loading = "success";
      state.list = state.list.filter((t) => t.id !== action.payload.id);
      state.current = null;
    },
    [updateImageTag.pending]: (state) => {
      state.loading = "loading";
    },
    [updateImageTag.rejected]: (state, action) => {
      state.loading = "error";
      state.error = action.payload;
    },
    [updateImageTag.fulfilled]: (state, action) => {
      state.loading = "success";
      let index = state.list.findIndex((t) => t.id === action.payload.id);
      state.list[index] = action.payload;
      state.current = action.payload;
    },
    [updateTagName.pending]: (state) => {
      state.loading = "loading";
    },
    [updateTagName.rejected]: (state, action) => {
      state.loading = "error";
      state.error = action.payload;
    },
    [updateTagName.fulfilled]: (state, action) => {
      state.loading = "success";
      let index = state.list.findIndex((t) => t.id === action.payload.id);
      state.list[index] = action.payload;
      state.current = action.payload;
    },
  },
});

export const { selectTag } = tagSlice.actions;

export default tagSlice.reducer;
