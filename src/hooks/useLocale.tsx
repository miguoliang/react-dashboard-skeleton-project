import appConfig from "configs/app.config";
import { create } from "zustand";

interface LocaleStore {
  currentLang: string;
  setLang: (lang: string) => void;
}

export default create<LocaleStore>((set) => ({
  currentLang: appConfig.locale,
  setLang: (lang: string) => set({ currentLang: lang }),
}));
