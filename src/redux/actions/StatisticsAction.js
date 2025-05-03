import axios from "axios";
import {
  statisticsRequest,
  statisticsFail,
  createVisitSuccess,
  getTodayStatsSuccess,
  getAllStatsSuccess,
  getWeekStatsSuccess,
} from "../reducers/statisticsSlice.js";

const server = import.meta.env.VITE_BACKEND_URL;

export const createVisit = () => async (dispatch) => {
  try {
    dispatch(statisticsRequest());
    const token = localStorage.getItem("Bearer"); // Fetch token

    const { data } = await axios.post(`${server}/stats/visit`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(createVisitSuccess(data));
  } catch (error) {
    dispatch(
      statisticsFail(error.response?.data?.message || "Failed to create visit")
    );
  }
};

export const getTodayStats = () => async (dispatch) => {
  try {
    dispatch(statisticsRequest());
    const token = localStorage.getItem("Bearer"); // Fetch token

    const { data } = await axios.get(`${server}/stats/today`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getTodayStatsSuccess(data));
  } catch (error) {
    dispatch(
      statisticsFail(
        error.response?.data?.message || "Failed to fetch today's stats"
      )
    );
  }
};

export const getAllStats = () => async (dispatch) => {
  try {
    dispatch(statisticsRequest());
    const token = localStorage.getItem("Bearer"); // Fetch token
    const { data } = await axios.get(`${server}/stats/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getAllStatsSuccess(data));
  } catch (error) {
    dispatch(
      statisticsFail(
        error.response?.data?.message || "Failed to fetch all stats"
      )
    );
  }
};

export const getWeekStats = () => async (dispatch) => {
  try {
    dispatch(statisticsRequest());
    const token = localStorage.getItem("Bearer"); // Fetch token

    const { data } = await axios.get(`${server}/stats/week`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getWeekStatsSuccess(data));
  } catch (error) {
    dispatch(
      statisticsFail(
        error.response?.data?.message || "Failed to fetch weekly stats"
      )
    );
  }
};
