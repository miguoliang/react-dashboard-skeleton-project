import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiGetCategoriesData,
  apiQueryArticleList,
} from "services/KnowledgeBaseService";
import {
  HelpCenterArticle,
  HelpCenterCategory,
} from "../../../../mock/data/knowledgeBaseData";

export const getCategories = createAsyncThunk(
  "knowledgeBaseHelpCenter/data/getCategories",
  async () => {
    const response = await apiGetCategoriesData();
    return response.data;
  }
);

export const queryArticles = createAsyncThunk(
  "knowledgeBaseHelpCenter/data/queryArticles",
  async (data: any) => {
    const response = await apiQueryArticleList(data);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "knowledgeBaseHelpCenter/data",
  initialState: {
    loading: false,
    isSearchResult: false,
    searchCategory: "",
    queryText: "",
    categories: [] as HelpCenterCategory[],
    articles: [] as HelpCenterArticle[],
  },
  reducers: {
    setSearchCategory: (state, action) => {
      state.searchCategory = action.payload;
    },
    setQueryText: (state, action) => {
      state.queryText = action.payload;
    },
    setSearch: (state, action) => {
      state.isSearchResult = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(queryArticles.fulfilled, (state, action) => {
      state.loading = false;
      state.articles = action.payload;
    });
    builder.addCase(queryArticles.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { setSearchCategory, setQueryText, setSearch } = dataSlice.actions;

export default dataSlice.reducer;
