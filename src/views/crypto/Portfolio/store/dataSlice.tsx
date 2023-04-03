import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetPortfolioData } from "services/CryptoService";

export const getPortfolioData = createAsyncThunk(
  "cryptoPortfolio/data/getPortfolioData",
  async () => {
    const response = await apiGetPortfolioData();
    return response.data;
  },
);

const dataSlice = createSlice({
  name: "cryptoPortfolio/data",
  initialState: {
    loading: true,
    portfolioData: {},
    eventList: [],
  },
  reducers: {
    updateEvent: (state, action) => {
      state.eventList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPortfolioData.fulfilled, (state, action) => {
      state.loading = false;
      state.portfolioData = action.payload;
    });
    builder.addCase(getPortfolioData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPortfolioData.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { updateEvent } = dataSlice.actions;

export default dataSlice.reducer;
