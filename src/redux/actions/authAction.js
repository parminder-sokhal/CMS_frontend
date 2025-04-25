import axios from "axios";
import { logout } from "../reducers/authSlice";
import {
  authRequest,
  authSuccess,
  authFail,
  registerSuccess,
  verifySuccess,
  loginSuccess,
  fetchUsersSuccess
} from "../reducers/authSlice.js";

const server = import.meta.env.VITE_BACKEND_URL;

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};

export const registerUser = (formData) => async (dispatch) => {
  try {
    dispatch(authRequest());

    const { data } = await axios.post(`${server}/auth/register`, formData);
    localStorage.setItem("verifyAccountpending", data.data.verifyAccountToken);


    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(
      authFail(error.response?.data?.message || "Failed to register user")
    );
  }
};

export const verifyAccount = (token) => async (dispatch) => {
  try {
    dispatch(authRequest());

    const { data } = await axios.get(`${server}/auth/verify-account/${token}`);

    dispatch(verifySuccess(data));
  } catch (error) {
    dispatch(
      authFail(error.response?.data?.message || "Failed to verify account")
    );
  }
};

export const loginUser = (formData) => async (dispatch) => {
  try {
    dispatch(authRequest());

    const { data } = await axios.post(`${server}/auth/login`, formData);

    // Store the token in localStorage
    localStorage.setItem("Bearer", data.data.token);
    localStorage.setItem("tokenCreatedAt", Date.now().toString());

    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(authFail(error.response?.data?.message || "Login failed"));
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch(authRequest());

    const token = localStorage.getItem("Bearer");

    const { data } = await axios.get(`${server}/auth/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchUsersSuccess(data));
  } catch (error) {
    dispatch(
      authFail(error.response?.data?.message || "Failed to fetch users")
    );
  }
};
