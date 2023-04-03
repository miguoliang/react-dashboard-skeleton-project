import { createSlice, current } from "@reduxjs/toolkit";

const stateSlice = createSlice({
  name: "salesOrderList/state",
  initialState: {
    selectedRows: [] as any[],
    selectedRow: [] as any[],
    deleteMode: "",
  },
  reducers: {
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
    setSelectedRow: (state, action) => {
      state.selectedRow = action.payload;
    },
    addRowItem: (state, action) => {
      const currentState = current(state);
      if (!currentState.selectedRows.includes(action.payload)) {
        return {
          ...currentState,
          selectedRows: [...currentState.selectedRows, ...action.payload],
        };
      }
    },
    removeRowItem: (state, action) => {
      const currentState = current(state);
      if (currentState.selectedRows.includes(action.payload)) {
        return {
          ...currentState,
          selectedRows: currentState.selectedRows.filter(
            (id) => id !== action.payload
          ),
        };
      }
    },
    setDeleteMode: (state, action) => {
      state.deleteMode = action.payload;
    },
  },
});

export const {
  setSelectedRows,
  setSelectedRow,
  addRowItem,
  removeRowItem,
  setDeleteMode,
} = stateSlice.actions;

export default stateSlice.reducer;
