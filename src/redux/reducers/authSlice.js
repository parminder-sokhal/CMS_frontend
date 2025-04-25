import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
  message: null,
  users: [], 
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    authSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },

    registerSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.data;
    },

    verifySuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },

    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.data.user;
      state.message = action.payload.message;
    },

    authFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    logout(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = null;
      state.error = null;

      localStorage.removeItem("Bearer");
      localStorage.removeItem("tokenCreatedAt");
    },

    fetchUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload.data; // Ensure users is always an array
    }
    
    
  },
});

export const {
  authRequest,
  authSuccess,
  registerSuccess,
  verifySuccess,
  loginSuccess,
  authFail,
  logout,
  fetchUsersSuccess, 
} = authSlice.actions;


export default authSlice.reducer;
