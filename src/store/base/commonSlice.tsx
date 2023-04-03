import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CommonState = {
  currentRouteKey: string;
};

export const initialState: CommonState = {
  currentRouteKey: "",
};

export const commonSlice = createSlice({
  name: "base/common",
  initialState,
  reducers: {
    setCurrentRouteKey: (state, action: PayloadAction<string>) => {
      state.currentRouteKey = action.payload;
    },
  },
});

export const { setCurrentRouteKey } = commonSlice.actions;

export default commonSlice.reducer;
