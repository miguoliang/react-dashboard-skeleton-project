import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Card, Member } from "mock/data/projectData";
import {
  apiGetScrumBoardMembers,
  apiGetScrumBoards,
} from "services/ProjectService";
import { keyBy } from "lodash";

export const getBoards = createAsyncThunk("scrumBoard/getBoards", async () => {
  const response = await apiGetScrumBoards();
  return response.data;
});

export const getMembers = createAsyncThunk(
  "scrumBoard/getMembers",
  async () => {
    const response = await apiGetScrumBoardMembers();
    return response.data;
  }
);

const dataSlice = createSlice({
  name: "scrumBoard/data",
  initialState: {
    loading: false,
    columns: {} as Record<string, Card[]>,
    ordered: [] as string[],
    boardMembers: [] as Member[],
    allMembers: [] as Member[],
  },
  reducers: {
    updateOrdered: (state, action) => {
      state.ordered = action.payload;
    },
    updateColumns: (state, action) => {
      state.columns = action.payload;
    },
    updateBoardMembers: (state, action) => {
      state.boardMembers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoards.fulfilled, (state, action) => {
      const mapped = keyBy(action.payload, "order");
      const columns = {} as Record<string, Card[]>;
      Object.keys(mapped).forEach((key) => {
        columns[key] = mapped[key].cards;
      });
      state.columns = columns;
      state.ordered = Object.keys(mapped);
      state.loading = false;
    });
    builder.addCase(getBoards.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBoards.rejected, (state, action) => {
      console.error(action.error.message);
      state.loading = false;
    });
    builder.addCase(getMembers.fulfilled, (state, action) => {
      state.boardMembers = action.payload.participantMembers;
      state.allMembers = action.payload.allMembers;
    });
  },
});

export const { updateOrdered, updateColumns, updateBoardMembers } =
  dataSlice.actions;

export default dataSlice.reducer;
