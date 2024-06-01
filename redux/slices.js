import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBookById, fetchBookByName, handleBookSearch } from "./booksApi";
import { handleLoginWithEmailAndPassword } from "./authApi";
import { PURGE } from "redux-persist";

const initialState = {
  books: {},
  singleBook: {},
  loading: false,
  loggedInUser: {},
};
export const loginWithEmailAndPassword = createAsyncThunk(
  "loginWithEmailAndPassword",
  async (loginDetails) => {
    const result = await handleLoginWithEmailAndPassword(loginDetails);
    return result;
  }
);
export const handleFetchBookByName = createAsyncThunk(
  "books/handleFetchBookByName",
  async (bookName) => {
    const response = await fetchBookByName(bookName);
    return response;
  }
);
export const handleFetchBookById = createAsyncThunk(
  "books/handleFetchBookById",
  async (bookId) => {
    const response = await fetchBookById(bookId);
    return response;
  }
);
// export const clearReducer = createAsyncThunk("books/clearReducer", async () => {
//   return true;
// });

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleFetchBookByName.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleFetchBookByName.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(handleFetchBookByName.rejected, (state) => {
        state.loading = false;
      })
      .addCase(handleFetchBookById.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleFetchBookById.fulfilled, (state, action) => {
        state.singleBook = action.payload;
        state.loading = false;
      })
      .addCase(handleFetchBookById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(loginWithEmailAndPassword.pending, (state) => {
        state.loading = false;
      })
      .addCase(loginWithEmailAndPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload;
        console.log("action====>", action.payload);
      })
      .addCase(loginWithEmailAndPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(PURGE, () => {
        return initialState;
      });
  },
});

export default bookSlice.reducer;
