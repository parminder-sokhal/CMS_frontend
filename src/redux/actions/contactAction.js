import axios from "axios";
import {
  contactRequest,
  contactFail,
  createContactSuccess,
  fetchContactsSuccess,
  fetchLatestContactsSuccess,
  updateStatusSuccess,
  updateActivitySuccess,
  updateCallDateSuccess,
} from "../reducers/contactSlice.js";

const server = import.meta.env.VITE_BACKEND_URL;

export const createContact = (formData) => async (dispatch) => {
  try {
    dispatch(contactRequest());

    const { data } = await axios.post(`${server}/contact/create`, formData);

    dispatch(createContactSuccess(data));
  } catch (error) {
    dispatch(
      contactFail(error.response?.data?.message || "Failed to create contact")
    );
  }
};

export const fetchContacts = () => async (dispatch) => {
  try {
    dispatch(contactRequest());

    const { data } = await axios.get(`${server}/contact`);

    dispatch(fetchContactsSuccess(data));
  } catch (error) {
    dispatch(
      contactFail(error.response?.data?.message || "Failed to fetch contacts")
    );
  }
};

export const fetchLatestContacts = () => async (dispatch) => {
  try {
    dispatch(contactRequest());

    const token = localStorage.getItem("Bearer");

    const { data } = await axios.get(`${server}/contact/latest`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchLatestContactsSuccess(data));
  } catch (error) {
    dispatch(
      contactFail(
        error.response?.data?.message || "Failed to fetch latest contacts"
      )
    );
  }
};

export const updateContactStatus = (id, statusData) => async (dispatch) => {
  try {
    dispatch(contactRequest());

    const { data } = await axios.put(
      `${server}/contact/status/${id}`,
      statusData
    );

    dispatch(updateStatusSuccess(data));
  } catch (error) {
    dispatch(
      contactFail(error.response?.data?.message || "Failed to update status")
    );
  }
};

export const updateContactActivity = (id) => async (dispatch) => {
  try {
    dispatch(contactRequest());

    const { data } = await axios.put(`${server}/contact/activity/${id}`);

    dispatch(updateActivitySuccess(data));
    dispatch(fetchLatestContacts(data));
  } catch (error) {
    dispatch(
      contactFail(error.response?.data?.message || "Failed to update activity")
    );
  }
};

export const updateContactCallDate = (id, callData) => async (dispatch) => {
  try {
    dispatch(contactRequest());

    const token = localStorage.getItem("Bearer");

    const { data } = await axios.put(`${server}/contact/call/${id}`, callData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(updateCallDateSuccess(data));
    dispatch(fetchLatestContacts(data));
  } catch (error) {
    dispatch(
      contactFail(error.response?.data?.message || "Failed to update call date")
    );
  }
};
