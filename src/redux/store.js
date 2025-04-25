import { configureStore } from "@reduxjs/toolkit";

import teacherSlice from "./reducers/teacherSlice.js";
import authSlice from "./reducers/authSlice.js";
import contactSlice from "./reducers/contactSlice.js";
import adminSlice from "./reducers/adminSlice.js";
import chatSlice from "./reducers/chatSlice.js";

const store = configureStore({
  reducer: {
    teacher: teacherSlice,
    auth: authSlice,
    contact: contactSlice,
    admin: adminSlice,
    chat:chatSlice,

  },
});

export default store;
