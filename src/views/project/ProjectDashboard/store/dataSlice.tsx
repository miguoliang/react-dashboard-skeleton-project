import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetProjectDashboardData } from "services/ProjectService";

export const getProjectDashboardData = createAsyncThunk(
  "projectDashboard/data/getProjectDashboardData",
  async (data: any) => {
    const response = await apiGetProjectDashboardData(data);
    return response.data;
  }
);

export const initialFilterData = {
  status: "",
};

const dataSlice = createSlice({
  name: "projectDashboard/data",
  initialState: {
    loading: true,
    dashboardData: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectDashboardData.fulfilled, (state, action) => {
      state.dashboardData = action.payload;
      state.loading = false;
    });
    builder.addCase(getProjectDashboardData.pending, (state) => {
      state.loading = true;
    });
  },
});

export default dataSlice.reducer;
