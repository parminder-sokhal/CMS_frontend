// redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import teacherSlice from "./reducers/teacherSlice.js";
import authSlice from "./reducers/authSlice.js";
import contactSlice from "./reducers/contactSlice.js";
import adminSlice from "./reducers/adminSlice.js";
import chatSlice from "./reducers/chatSlice.js";

// Combine your slices
const rootReducer = combineReducers({
  teacher: teacherSlice,
  auth: authSlice,        // <- the important one you want to persist
  contact: contactSlice,
  admin: adminSlice,
  chat: chatSlice,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist auth slice (you can add more if needed)
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});

// Create the persistor
export const persistor = persistStore(store);
