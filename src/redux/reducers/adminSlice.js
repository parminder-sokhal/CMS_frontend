import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  roles: [],
  activeRoles: [],
  companies: [],
  activeCompanies: [],
  error: null,
  message: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getRolesSuccess(state, action) {
      state.loading = false;
      state.roles = action.payload.data;
      state.message = action.payload.message;
    },
    getActiveRolesSuccess(state, action) {
      state.loading = false;
      state.activeRoles = action.payload.data;
      state.message = action.payload.message;
    },
    getCompaniesSuccess(state, action) {
      state.loading = false;
      state.companies = action.payload.data;
      state.message = action.payload.message;
    },
    getActiveCompaniesSuccess(state, action) {
      state.loading = false;
      state.activeCompanies = action.payload.data;
      state.message = action.payload.message;
    },
    adminFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  adminRequest,
  getRolesSuccess,
  getActiveRolesSuccess,
  getCompaniesSuccess,
  getActiveCompaniesSuccess,
  adminFail,
} = adminSlice.actions;

export default adminSlice.reducer;
