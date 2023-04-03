import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiDeleteSalesProducts,
  apiGetSalesProduct,
  apiPutSalesProduct,
} from "services/SalesService";
import { Product } from "../../../../mock/data/salesData";

export const getProduct = createAsyncThunk(
  "salesProductEdit/data/getProducts",
  async (data: any) => {
    const response = await apiGetSalesProduct(data);
    return response.data;
  }
);

export const updateProduct = async (data: Product) => {
  const response = await apiPutSalesProduct(data);
  return response.data;
};

export const deleteProduct = async (data: any) => {
  const response = await apiDeleteSalesProducts(data);
  return response.data;
};

const dataSlice = createSlice({
  name: "salesProductEdit/data",
  initialState: {
    loading: false,
    productData: null as Product | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.productData = action.payload;
      state.loading = false;
    });
    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
    });
  },
});

export default dataSlice.reducer;
