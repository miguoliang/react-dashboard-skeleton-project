import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiDeleteCrmCustomer,
  apiGetCrmCustomerDetails,
  apPutCrmCustomer,
} from "services/CrmService";
import {
  OrderHistory,
  PaymentMethod,
  Subscription,
  User,
  UserDetail,
} from "../../../../mock/data/usersData";
import { noop } from "lodash";

export const getCustomer = createAsyncThunk(
  "crmCustomerDetails/data/getCustomer",
  async (data: { id: string }) => {
    const response = await apiGetCrmCustomerDetails(data);
    return response.data;
  }
);

export const deleteCustomer = createAsyncThunk(
  "crmCustomerDetails/data/deleteCustomer",
  async (data: { id: string }) => {
    const response = await apiDeleteCrmCustomer(data);
    return response.data;
  }
);

export const putCustomer = createAsyncThunk(
  "crmCustomerDetails/data/putCustomer",
  async (data: UserDetail) => {
    const response = await apPutCrmCustomer(data);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "crmCustomerDetails/data",
  initialState: {
    loading: false,
    profileData: {} as User,
    subscriptionData: [] as Subscription[],
    paymentHistoryData: [] as OrderHistory[],
    paymentMethodData: [] as PaymentMethod[],
  },
  reducers: {
    updatePaymentMethodData: (state, action) => {
      state.paymentMethodData = action.payload;
    },
    updateProfileData: (state, action) => {
      state.profileData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.profileData = action.payload;
      state.subscriptionData = action.payload.subscription || [];
      state.paymentHistoryData = action.payload.orderHistory || [];
      state.paymentMethodData = action.payload.paymentMethod || [];
    });
    builder.addCase(deleteCustomer.fulfilled, noop);
    builder.addCase(putCustomer.fulfilled, noop);
    builder.addCase(getCustomer.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { updatePaymentMethodData, updateProfileData } = dataSlice.actions;

export default dataSlice.reducer;
