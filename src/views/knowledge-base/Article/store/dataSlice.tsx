import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiGetArticle,
  apiGetOthersArticleList,
} from "services/KnowledgeBaseService";
import { HelpCenterArticle } from "../../../../mock/data/knowledgeBaseData";

export const getArticle = createAsyncThunk(
  "knowledgeBaseArticle/data/getArticle",
  async (param: any) => {
    const response = await apiGetArticle(param);
    return response.data;
  },
);

export const getOthersArticle = createAsyncThunk(
  "knowledgeBaseArticle/data/getOthersArticle",
  async (param: any) => {
    const response = await apiGetOthersArticleList(param);
    return response.data;
  },
);

const dataSlice = createSlice({
  name: "knowledgeBaseArticle/data",
  initialState: {
    loading: false,
    otherLoading: false,
    article: {},
    othersArticle: {
      relatedArticle: [] as HelpCenterArticle[],
      popularArticle: [] as HelpCenterArticle[],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArticle.fulfilled, (state, action) => {
      state.loading = false;
      state.article = action.payload;
    });
    builder.addCase(getArticle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOthersArticle.fulfilled, (state, action) => {
      state.otherLoading = false;
      state.othersArticle = action.payload;
    });
    builder.addCase(getOthersArticle.pending, (state) => {
      state.otherLoading = true;
    });
  },
});

export default dataSlice.reducer;
