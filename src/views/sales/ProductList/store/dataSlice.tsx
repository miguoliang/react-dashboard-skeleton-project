import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "mock/data/salesData";
import {
  apiDeleteSalesProducts,
  apiGetSalesProducts,
} from "services/SalesService";

export const getProducts = createAsyncThunk(
  "salesProductList/data/getProducts",
  async (data: any) => {
    const response = await apiGetSalesProducts(data);
    return response.data;
  },
);

export const deleteProduct = async (data: any) => {
  const response = await apiDeleteSalesProducts(data);
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

export const initialFilterData = {
  name: "",
  category: ["bags", "cloths", "devices", "shoes", "watches"],
  status: [0, 1, 2],
  productStatus: 0,
};

const dataSlice = createSlice({
  name: "salesProductList/data",
  initialState: {
    loading: false,
    productList: [] as Product[],
    tableData: initialTableData,
    filterData: initialFilterData,
  },
  reducers: {
    updateProductList: (state, action) => {
      state.productList = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.productList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    });
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { updateProductList, setTableData, setFilterData } =
  dataSlice.actions;

export default dataSlice.reducer;
