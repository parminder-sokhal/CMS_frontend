import axios from "axios";
import {
  adminRequest,
  adminFail,
  getRolesSuccess,
  getActiveRolesSuccess,
  getCompaniesSuccess,
  getActiveCompaniesSuccess,
} from "../reducers/adminSlice.js";

const server = import.meta.env.VITE_BACKEND_URL;

export const getAllRoles = () => async (dispatch) => {
  try {
    dispatch(adminRequest());

    const { data } = await axios.get(`${server}/admin/roles`);
    dispatch(getRolesSuccess(data));
  } catch (error) {
    dispatch(
      adminFail(error.response?.data?.message || "Failed to fetch roles")
    );
  }
};

export const getAllActiveRoles = () => async (dispatch) => {
  try {
    dispatch(adminRequest());

    const { data } = await axios.get(`${server}/admin/roles-active`);
    dispatch(getActiveRolesSuccess(data));
  } catch (error) {
    dispatch(
      adminFail(error.response?.data?.message || "Failed to fetch active roles")
    );
  }
};

export const getAllCompanies = () => async (dispatch) => {
  try {
    dispatch(adminRequest());

    const { data } = await axios.get(`${server}/admin/companies`);
    dispatch(getCompaniesSuccess(data));
  } catch (error) {
    dispatch(
      adminFail(error.response?.data?.message || "Failed to fetch companies")
    );
  }
};

export const getAllActiveCompanies = () => async (dispatch) => {
  try {
    dispatch(adminRequest());

    const { data } = await axios.get(`${server}/admin/companies-active`);
    dispatch(getActiveCompaniesSuccess(data));
  } catch (error) {
    dispatch(
      adminFail(error.response?.data?.message || "Failed to fetch active companies")
    );
  }
};
