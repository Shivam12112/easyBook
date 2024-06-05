import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import {
  handleLoginWithEmailAndPassword,
  handleRegister,
  updateProfileData,
} from "./authApi";
import { fetchBookById, fetchBookByName } from "./booksApi";

const initialState = {
  books: {},
  singleBook: {},
  loading: false,
  loggedInUser: {},
  headerShown: false,
  onboardingScreen: true,
};

export const loginWithEmailAndPassword = createAsyncThunk(
  "loginWithEmailAndPassword",
  async (loginDetails) => {
    const result = await handleLoginWithEmailAndPassword(loginDetails);
    return result;
  }
);
export const registerWithEmailAndPassword = createAsyncThunk(
  "registerWithEmailAndPassword",
  async (userDetails) => {
    const result = await handleRegister(userDetails);
    console.log(result, "register");
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
export const handleUpdateProfile = createAsyncThunk(
  "books/handleUpdateProfile",
  async (payload) => {
    const response = await updateProfileData(payload);
    return response;
  }
);

export const handleOnboardingScreen = createAction(
  "books/onboardingScreen",
  () => {
    return {
      payload: false,
    };
  }
);

const resetStateExceptOnboardingScreen = (state) => {
  return {
    ...initialState,
    onboardingScreen: state.onboardingScreen,
  };
};

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
      .addCase(registerWithEmailAndPassword.pending, (state) => {
        state.loading = false;
      })
      .addCase(registerWithEmailAndPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload;
      })
      .addCase(registerWithEmailAndPassword.rejected, (state) => {
        state.loading = false;
      })
      .addCase(handleUpdateProfile.pending, (state) => {
        state.loading = false;
      })
      .addCase(handleUpdateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUser = action.payload;
      })
      .addCase(handleUpdateProfile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(handleOnboardingScreen, (state, action) => {
        state.onboardingScreen = action.payload;
      })
      .addCase(PURGE, (state) => resetStateExceptOnboardingScreen(state));
  },
});

export default bookSlice.reducer;
