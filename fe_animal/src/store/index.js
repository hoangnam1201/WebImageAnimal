import { configureStore } from "@reduxjs/toolkit";
import tagReducer from "./slices/tagSlice";
import pictureReducer from "./slices/pictureSlice";

const store = configureStore({
  reducer: { tag: tagReducer, picture: pictureReducer },
});

export default store;
