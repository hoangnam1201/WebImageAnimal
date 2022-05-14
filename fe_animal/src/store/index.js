import { configureStore } from "@reduxjs/toolkit";
import tagReducer from "./slices/tagSlice";
import pictureReducer from "./slices/pictureSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: { tag: tagReducer, picture: pictureReducer, user: userReducer },
});

export default store;
