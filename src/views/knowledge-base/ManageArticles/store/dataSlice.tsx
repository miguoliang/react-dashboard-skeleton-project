import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetCategorizedArticles } from "services/KnowledgeBaseService";
import { HelpCenterCategory } from "../../../../mock/data/knowledgeBaseData";

export const getCategorizedArticles = createAsyncThunk(
  "knowledgeBaseManageArticles/data/getCategorizedArticles",
  async (data: any) => {
    const response = await apiGetCategorizedArticles(data);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "knowledgeBaseManageArticles/data",
  initialState: {
    loading: false,
    categorizedArticles: [] as HelpCenterCategory[],
  },
  reducers: {
    setCategorizedArticles: (state, action) => {
      state.categorizedArticles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategorizedArticles.fulfilled, (state, action) => {
      state.loading = false;
      state.categorizedArticles = action.payload;
    });
    builder.addCase(getCategorizedArticles.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { setCategorizedArticles } = dataSlice.actions;

export default dataSlice.reducer;
