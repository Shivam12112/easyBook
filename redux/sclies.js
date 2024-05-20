import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBookById, fetchBookByName, handleBookSearch } from "./booksApi";

const initialState = {
  books: {},
  singleBook: {},
  loading: false,
};

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
      });
  },
});

export default bookSlice.reducer;
