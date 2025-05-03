import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  visit: null,
  todayStats: null,
  allStats: [], 
  weekStats: null,
  error: null,
  message: null,
};


const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    statisticsRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    createVisitSuccess(state, action) {
      state.loading = false;
      state.visit = action.payload.data;
      state.message = action.payload.message;
    },
    getTodayStatsSuccess(state, action) {
      state.loading = false;
      state.todayStats = action.payload.data;
      state.message = action.payload.message;
    },
    getAllStatsSuccess(state, action) {
      state.loading = false;
      state.allStats = action.payload.data;
      state.message = action.payload.message;
    },
    getWeekStatsSuccess(state, action) {
      state.loading = false;
      state.weekStats = action.payload.data;
      state.message = action.payload.message;
    },
    statisticsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  statisticsRequest,
  createVisitSuccess,
  getTodayStatsSuccess,
  getAllStatsSuccess,
  getWeekStatsSuccess,
  statisticsFail,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
