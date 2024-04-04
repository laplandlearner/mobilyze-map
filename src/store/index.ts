import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./locationSlice";

// Create Redux store
export const store = configureStore({
  reducer: {
    locations: locationReducer, // Combine reducers
  },
  // Disable serializable check for localStorage data
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// Subscribe to store changes and save data to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('locations', JSON.stringify(state.locations)); // Save locations data to localStorage
});

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>; // RootState represents the combined state of the Redux store
export type AppDispatch = typeof store.dispatch; // AppDispatch represents the dispatch function of the Redux store
