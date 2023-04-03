import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetCrmCalendar } from "services/CrmService";
import { Event } from "mock/data/crmData";

export const getEvents = createAsyncThunk(
  "crmCalendar/data/getEvents",
  async () => {
    const response = await apiGetCrmCalendar();
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "crmCalendar/data",
  initialState: {
    loading: false,
    eventList: [] as Event[],
  },
  reducers: {
    updateEvent: (state, action) => {
      state.eventList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.eventList = action.payload;
    });
  },
});

export const { updateEvent } = dataSlice.actions;

export default dataSlice.reducer;
