import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./slices"; // Corrected the typo from 'sclies' to 'slices'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, bookSlice);

// Configure and create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);
