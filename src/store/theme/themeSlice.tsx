import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { themeConfig } from "../../configs/theme.config";
import {
  Direction,
  LayoutType,
  NavMode,
  ThemeMode,
} from "../../constants/theme.constant";

const initialNavMode = () => {
  if (
    themeConfig.layout.type === "modern" &&
    themeConfig.navMode !== "themed"
  ) {
    return "transparent";
  }
  return themeConfig.navMode;
};

interface ThemeState {
  themeColor: string;
  direction: Direction;
  mode: ThemeMode;
  locale: "en";
  primaryColorLevel: number;
  panelExpand: boolean;
  navMode: NavMode;
  layout: {
    type: LayoutType;
    previousType: LayoutType;
    sideNavCollapse: boolean;
  };
  cardBordered: boolean;
}

const initialState: ThemeState = {
  themeColor: themeConfig.themeColor,
  direction: themeConfig.direction,
  mode: themeConfig.mode,
  locale: themeConfig.locale,
  primaryColorLevel: themeConfig.primaryColorLevel,
  panelExpand: themeConfig.panelExpand,
  navMode: initialNavMode(),
  layout: { previousType: themeConfig.layout.type, ...themeConfig.layout },
  cardBordered: themeConfig.layout.type === "modern",
};

const availableNavColorLayouts: LayoutType[] = [
  "classic",
  "stackedSide",
  "decked",
];

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDirection: (state, action: PayloadAction<Direction>) => {
      state.direction = action.payload;
    },
    setMode: (state, action: PayloadAction<ThemeMode>) => {
      const availableColorNav = availableNavColorLayouts.includes(
        state.layout.type
      );

      if (
        availableColorNav &&
        action.payload === "dark" &&
        state.navMode !== "themed"
      ) {
        state.navMode = "dark";
      }
      if (
        availableColorNav &&
        action.payload === "light" &&
        state.navMode !== "themed"
      ) {
        state.navMode = "light";
      }
      state.mode = action.payload;
    },
    setLang: (state, action) => {
      state.locale = action.payload;
    },
    setLayout: (state, action: PayloadAction<LayoutType>) => {
      state.cardBordered = action.payload === "modern";
      if (action.payload === "modern") {
        state.navMode = "transparent";
      }

      const availableColorNav = availableNavColorLayouts.includes(
        action.payload
      );

      if (availableColorNav && state.mode === "light") {
        state.navMode = "light";
      }

      if (availableColorNav && state.mode === "dark") {
        state.navMode = "dark";
      }

      state.layout = {
        ...state.layout,
        ...{ type: action.payload },
      };
    },
    setPreviousLayout: (state, action: PayloadAction<LayoutType>) => {
      state.layout.previousType = action.payload;
    },
    setSideNavCollapse: (state, action) => {
      state.layout = {
        ...state.layout,
        ...{ sideNavCollapse: action.payload },
      };
    },
    setNavMode: (state, action: PayloadAction<NavMode>) => {
      if (action.payload !== "default") {
        state.navMode = action.payload;
      } else {
        if (state.layout.type === "modern") {
          state.navMode = "transparent";
        }

        const availableColorNav = availableNavColorLayouts.includes(
          state.layout.type
        );

        if (availableColorNav && state.mode === "light") {
          state.navMode = "light";
        }

        if (availableColorNav && state.mode === "dark") {
          state.navMode = "dark";
        }
      }
    },
    setPanelExpand: (state, action) => {
      state.panelExpand = action.payload;
    },
    setThemeColor: (state, action: PayloadAction<string>) => {
      state.themeColor = action.payload;
    },
    setThemeColorLevel: (state, action) => {
      state.primaryColorLevel = action.payload;
    },
  },
});

export const {
  setDirection,
  setMode,
  setLang,
  setLayout,
  setSideNavCollapse,
  setNavMode,
  setPanelExpand,
  setThemeColor,
  setThemeColorLevel,
  setPreviousLayout,
} = themeSlice.actions;

export default themeSlice.reducer;
