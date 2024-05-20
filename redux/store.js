import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./sclies";

export const store = configureStore({
  reducer: {
    bookStore: bookSlice,
  },
});
