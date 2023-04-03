import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiGetTransactionHistoryData,
  apiGetWalletData,
} from "services/CryptoService";
import { Trade, Wallet } from "../../../../mock/data/cryptoData";

export const getWalletData = createAsyncThunk(
  "cryptoWallets/data/getWalletData",
  async () => {
    const response = await apiGetWalletData();
    return response.data;
  }
);

export const getTransactionHistoryData = createAsyncThunk(
  "cryptoWallets/data/getTransactionHistoryData",
  async (data: any) => {
    const response = await apiGetTransactionHistoryData(data);
    return response.data;
  }
);

export const initialTableData = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  query: "",
  sort: {
    order: "",
    key: "",
  },
};

const dataSlice = createSlice({
  name: "cryptoWallets/data",
  initialState: {
    loading: true,
    walletsData: [] as Wallet[],
    transactionHistoryLoading: true,
    transactionHistoryData: [] as Trade[],
    tableData: initialTableData,
    selectedTab: "trade",
  },
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setTransactionHistoryData: (state, action) => {
      state.transactionHistoryData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWalletData.fulfilled, (state, action) => {
      state.loading = false;
      state.walletsData = action.payload;
    });
    builder.addCase(getWalletData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTransactionHistoryData.fulfilled, (state, action) => {
      state.transactionHistoryLoading = false;
      state.tableData.total = action.payload.total;
      state.transactionHistoryData = action.payload.data;
    });
    builder.addCase(getTransactionHistoryData.pending, (state) => {
      state.transactionHistoryLoading = true;
    });
  },
});

export const { setSelectedTab, setTableData, setTransactionHistoryData } =
  dataSlice.actions;

export default dataSlice.reducer;
