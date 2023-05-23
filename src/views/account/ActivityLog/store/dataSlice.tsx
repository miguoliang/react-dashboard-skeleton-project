import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { apiGetAccountLogData } from "services/AccountServices";
import { Log } from "../../../../mock/data/accountData";

export const getLogs = createAsyncThunk(
  "accountActivityLog/data/getLogs",
  async (data: { filter: boolean; activityIndex: number }) => {
    const response = await apiGetAccountLogData(data);
    return response.data;
  },
);

export const filterLogs = createAsyncThunk(
  "accountActivityLog/data/filterLogs",
  async (data: { activityIndex: number; filter: boolean }) => {
    const response = await apiGetAccountLogData(data);
    return response.data;
  },
);

const dataSlice = createSlice({
  name: "accountActivityLog/data",
  initialState: {
    loading: false,
    loadMoreLoading: false,
    loadable: false,
    activityIndex: 1,
    logs: [] as Log[],
  },
  reducers: {
    setLogs: (state, action) => {
      state.logs = action.payload;
    },
    setActivityIndex: (state, action) => {
      state.activityIndex = action.payload;
    },
  },
  extraReducers: {
    [getLogs.fulfilled as any]: (state, action) => {
      const currentState = current(state);
      state.logs = [...currentState.logs, ...action.payload.data];
      state.loadMoreLoading = false;
      state.loadable = action.payload.loadable;
    },
    [getLogs.pending as any]: (state) => {
      state.loadMoreLoading = true;
    },
    [filterLogs.fulfilled as any]: (state, action) => {
      state.logs = action.payload.data;
      state.loading = false;
      state.loadable = action.payload.loadable;
    },
    [filterLogs.pending as any]: (state) => {
      state.loading = true;
    },
  },
});

export const { setActivityIndex } = dataSlice.actions;

export default dataSlice.reducer;
