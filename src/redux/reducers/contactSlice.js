import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  contacts: [],
  latestContacts: [],
  error: null,
  message: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    contactRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    createContactSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.contacts.push(action.payload.data);
    },
    fetchContactsSuccess(state, action) {
      state.loading = false;
      state.contacts = action.payload.data;
      state.message = action.payload.message;
    },
    fetchLatestContactsSuccess(state, action) {
      state.loading = false;
      state.latestContacts = action.payload.data;
      state.message = action.payload.message;
    },
    updateStatusSuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateActivitySuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    contactFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  contactRequest,
  createContactSuccess,
  fetchContactsSuccess,
  fetchLatestContactsSuccess,
  updateStatusSuccess,
  updateActivitySuccess,
  contactFail,
} = contactSlice.actions;

export default contactSlice.reducer;
