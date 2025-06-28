// appStore.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import summaryReducer from './summarySlice'

const appStore = configureStore({
  reducer: {
    user: userReducer,
    summary:summaryReducer,
  }
});

export default appStore;
 