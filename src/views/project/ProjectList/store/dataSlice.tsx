import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiGetProjectList,
  apiGetScrumBoardMembers,
  apiPutProjectList,
} from "services/ProjectService";
import { Member, Project } from "../../../../mock/data/projectData";

export const getList = createAsyncThunk(
  "projectList/getList",
  async (data: any) => {
    const response = await apiGetProjectList(data);
    return response.data;
  }
);

export const getMembers = createAsyncThunk(
  "projectList/getMembers",
  async () => {
    const response = await apiGetScrumBoardMembers();
    return response.data.allMembers;
  }
);

export const putProject = createAsyncThunk(
  "projectList/putProject",
  async (data: Project) => {
    const response = await apiPutProjectList(data);
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "projectList/data",
  initialState: {
    loading: false,
    projectList: [] as Project[],
    allMembers: [] as Member[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getList.fulfilled, (state, action) => {
      state.projectList = action.payload;
      state.loading = false;
    });
    builder.addCase(getList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMembers.fulfilled, (state, action) => {
      state.allMembers = action.payload;
    });
    builder.addCase(putProject.fulfilled, (state, action) => {
      state.projectList = action.payload;
    });
  },
});

export default dataSlice.reducer;
