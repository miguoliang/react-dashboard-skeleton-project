import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetCrmMail, apiGetCrmMails } from "services/CrmService";
import { Mail } from "../../../../mock/data/crmData";

export const getMails = createAsyncThunk(
  "crmMail/data/getMails",
  async (params: any) => {
    const response = await apiGetCrmMails(params);
    return response.data;
  }
);

export const getMail = createAsyncThunk(
  "crmMail/data/getMail",
  async (params: any) => {
    const response = await apiGetCrmMail(params);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "crmMail/data",
  initialState: {
    mailListLoading: false,
    mailLoading: false,
    mailList: [] as Mail[],
    mail: {},
    selectedMailId: "",
  },
  reducers: {
    updateMailList: (state, action) => {
      state.mailList = action.payload;
    },
    updateMail: (state, action) => {
      state.mail = action.payload;
    },
    updateMailId: (state, action) => {
      if (action.payload) {
        state.mailLoading = true;
      }
      state.selectedMailId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMails.fulfilled, (state, action) => {
      state.mailListLoading = false;
      state.mailList = action.payload;
    });
    builder.addCase(getMail.fulfilled, (state, action) => {
      state.mailLoading = false;
      state.mail = action.payload;
    });
    builder.addCase(getMails.pending, (state) => {
      state.mailListLoading = true;
    });
    builder.addCase(getMail.pending, (state) => {
      state.mailLoading = true;
    });
  },
});

export const { updateMailList, updateMail, updateMailId } = dataSlice.actions;

export default dataSlice.reducer;
