import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetArticle } from "services/KnowledgeBaseService";
import { HelpCenterArticle } from "../../../../mock/data/knowledgeBaseData";

export const getArticle = createAsyncThunk(
  "knowledgeBaseEditArticle/data/getArticle",
  async (param: any) => {
    const response = await apiGetArticle(param);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "knowledgeBaseEditArticle/data",
  initialState: {
    loading: false,
    article: null as HelpCenterArticle | null,
  },
  reducers: {
    setArticle: (state, action) => {
      state.article = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArticle.fulfilled, (state, action) => {
      state.loading = false;
      state.article = action.payload;
    });
    builder.addCase(getArticle.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { setArticle } = dataSlice.actions;

export default dataSlice.reducer;
