import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order } from "mock/data/salesData";
import { apiDeleteSalesOrders, apiGetSalesOrders } from "services/SalesService";

export const getOrders = createAsyncThunk(
  "salesProductList/data/getOrders",
  async (data: any) => {
    const response = await apiGetSalesOrders(data);
    return response.data;
  }
);

export const deleteOrders = async (data: any) => {
  const response = await apiDeleteSalesOrders(data);
  return response.data;
};

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
  name: "salesOrderList/data",
  initialState: {
    loading: false,
    orderList: [] as Order[],
    tableData: initialTableData,
  },
  reducers: {
    setOrderList: (state, action) => {
      state.orderList = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orderList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    });
    builder.addCase(getOrders.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { setOrderList, setTableData } = dataSlice.actions;

export default dataSlice.reducer;
