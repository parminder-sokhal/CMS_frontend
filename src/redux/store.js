// redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import teacherSlice from "./reducers/teacherSlice.js";
import authSlice from "./reducers/authSlice.js";
import contactSlice from "./reducers/contactSlice.js";
import adminSlice from "./reducers/adminSlice.js";
import chatSlice from "./reducers/chatSlice.js";
import StatisticsSlice from "./reducers/statisticsSlice.js";

const rootReducer = combineReducers({
  teacher: teacherSlice,
  auth: authSlice,       
  contact: contactSlice,
  admin: adminSlice,
  chat: chatSlice,
  statistics: StatisticsSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);
