import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBookById, fetchBookByName } from "./booksApi";
import { handleLoginWithEmailAndPassword } from "./authApi";
import { PURGE } from "redux-persist";

const initialState = {
  books: {},
  singleBook: {},
  loading: false,
  loggedInUser: {},
  headerShown: false,
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

// Define action creator using createAction
export const handleHeaderShown = createAction(
  "books/handleHeaderShown",
  (shown) => {
    return {
      payload: shown,
    };
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
      })
      .addCase(loginWithEmailAndPassword.pending, (state) => {
        state.loading = false;
      })
      .addCase(loginWithEmailAndPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload;
      })
      .addCase(loginWithEmailAndPassword.rejected, (state) => {
        state.loading = false;
      })
      // Corrected usage of handleHeaderShown action creator
      .addCase(handleHeaderShown, (state, action) => {
        state.headerShown = action.payload;
      })
      .addCase(PURGE, () => {
        return initialState;
      });
  },
});

// export const actions = { ...bookSlice.actions, handleHeaderShown };
export default bookSlice.reducer;
