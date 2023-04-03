import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetCryptoDashboardData } from "services/CryptoService";

export const getCryptoDashboardData = createAsyncThunk(
  "cryptoDashboard/data/getCryptoDashboardData",
  async () => {
    const response = await apiGetCryptoDashboardData();
    return response.data;
  },
);

const dataSlice = createSlice({
  name: "cryptoDashboard/data",
  initialState: {
    loading: true,
    dashboardData: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCryptoDashboardData.fulfilled, (state, action) => {
      state.loading = false;
      state.dashboardData = action.payload;
    });
    builder.addCase(getCryptoDashboardData.pending, (state) => {
      state.loading = true;
    });
  },
});

export default dataSlice.reducer;
