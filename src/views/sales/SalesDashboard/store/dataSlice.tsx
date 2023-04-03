import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetSalesDashboardData } from "services/SalesService";

export const getSalesDashboardData = createAsyncThunk(
  "salesDashboard/data/getSalesDashboardData",
  async (data) => {
    const response = await apiGetSalesDashboardData(data);
    return response.data;
  }
);

export const initialFilterData = {
  status: "",
};

const dataSlice = createSlice({
  name: "salesDashboard/data",
  initialState: {
    loading: true,
    dashboardData: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSalesDashboardData.fulfilled, (state, action) => {
      state.dashboardData = action.payload;
      state.loading = false;
    });
    builder.addCase(getSalesDashboardData.pending, (state) => {
      state.loading = true;
    });
  },
});

export default dataSlice.reducer;
