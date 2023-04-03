import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserDetail } from "mock/data/usersData";
import {
  apiGetCrmCustomers,
  apiGetCrmCustomersStatistic,
  apPutCrmCustomer,
} from "services/CrmService";
import { SortingState } from "@tanstack/react-table";

export const getCustomerStatistic = createAsyncThunk(
  "crmCustomers/data/getCustomerStatistic",
  async (param) => {
    const response = await apiGetCrmCustomersStatistic(param);
    return response.data;
  }
);

export const getCustomers = createAsyncThunk(
  "crmCustomers/data/getCustomers",
  async (params: {
    pageIndex: number;
    pageSize: number;
    sort: SortingState;
    query: string;
    filterData: any;
  }) => {
    const response = await apiGetCrmCustomers(params);
    return response.data;
  }
);

export const putCustomer = createAsyncThunk(
  "crmCustomers/data/putCustomer",
  async (data: UserDetail) => {
    const response = await apPutCrmCustomer(data);
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

export const initialFilterData = {
  status: "",
};

const dataSlice = createSlice({
  name: "crmCustomers/data",
  initialState: {
    loading: false,
    customerList: [] as UserDetail[],
    statisticData: {},
    tableData: initialTableData,
    filterData: initialFilterData,
    statisticLoading: false,
  },
  reducers: {
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setCustomerList: (state, action) => {
      state.customerList = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.customerList = action.payload.data;
      state.tableData.total = action.payload.total;
      state.loading = false;
    });
    builder.addCase(getCustomers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCustomerStatistic.pending, (state) => {
      state.statisticLoading = true;
    });
    builder.addCase(getCustomerStatistic.fulfilled, (state, action) => {
      state.statisticData = action.payload;
      state.statisticLoading = false;
    });
  },
});

export const { setTableData, setCustomerList, setFilterData } =
  dataSlice.actions;

export default dataSlice.reducer;
