import appConfig from "configs/app.config";
import { create } from "zustand";

export interface LocaleStore {
  currentLang: string;
  setLang: (lang: string) => void;
}

export const useLocaleStore = create<LocaleStore>((set) => ({
  currentLang: appConfig.locale,
  setLang: (lang: string) => set({ currentLang: lang }),
}));
