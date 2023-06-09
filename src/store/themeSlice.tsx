import { themeConfig } from "configs/theme.config";
import {
  Direction,
  LayoutType,
  NavMode,
  ThemeMode,
} from "constants/theme.constant";
import { create } from "zustand";

export interface ThemeStore {
  themeColor: string;
  themeColorLevel: number;
  direction: Direction;
  mode: ThemeMode;
  locale: string;
  primaryColorLevel: number;
  panelExpand: boolean;
  navMode: NavMode;
  layout: LayoutType;
  cardBordered: boolean;
  sideNavCollapse: boolean;
  currentRouteKey: string;
  setDirection: (direction: Direction) => void;
  setMode: (mode: ThemeMode) => void;
  setLang: (lang: string) => void;
  setLayout: (layout: LayoutType) => void;
  setSideNavCollapse: (sideNavCollapse: boolean) => void;
  setNavMode: (navMode: NavMode) => void;
  setPanelExpand: (panelExpand: boolean) => void;
  setCardBordered: (cardBordered: boolean) => void;
  setPrimaryColorLevel: (primaryColorLevel: number) => void;
  setCurrentRouteKey: (currentRouteKey: string) => void;
  setThemeColor: (themeColor: string) => void;
  setThemeColorLevel: (primaryColorLevel: number) => void;
}

const initialNavMode = () => {
  if (
    themeConfig.layout.type === "modern" &&
    themeConfig.navMode !== "themed"
  ) {
    return "transparent";
  }
  return themeConfig.navMode;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  themeColor: themeConfig.themeColor,
  themeColorLevel: themeConfig.primaryColorLevel,
  direction: themeConfig.direction,
  mode: themeConfig.mode,
  locale: themeConfig.locale,
  primaryColorLevel: themeConfig.primaryColorLevel,
  panelExpand: themeConfig.panelExpand,
  navMode: initialNavMode(),
  layout: themeConfig.layout.type,
  currentRouteKey: "",
  sideNavCollapse: themeConfig.layout.sideNavCollapse,
  cardBordered: themeConfig.layout.type === "modern",
  setDirection: (direction: Direction) => set({ direction }),
  setMode: (mode: ThemeMode) => set({ mode }),
  setLang: (lang: string) => set({ locale: lang }),
  setLayout: (layout: ThemeStore["layout"]) => set({ layout }),
  setPreviousLayout: (layout: LayoutType) => set({ layout }),
  setSideNavCollapse: (sideNavCollapse: boolean) => set({ sideNavCollapse }),
  setNavMode: (navMode: NavMode) => set({ navMode }),
  setPanelExpand: (panelExpand: boolean) => set({ panelExpand }),
  setThemeColor: (themeColor: string) => set({ themeColor }),
  setThemeColorLevel: (primaryColorLevel: number) => set({ primaryColorLevel }),
  setCardBordered: (cardBordered: boolean) => set({ cardBordered }),
  setPrimaryColorLevel: (primaryColorLevel: number) =>
    set({ primaryColorLevel }),
  setCurrentRouteKey: (currentRouteKey: string) => set({ currentRouteKey }),
}));
