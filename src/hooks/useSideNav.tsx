import { create } from "zustand";

interface SideNavStore {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const useSideNav = create<SideNavStore>((set) => ({
  collapsed: false,
  setCollapsed: (collapsed: boolean) => set({ collapsed }),
}));
