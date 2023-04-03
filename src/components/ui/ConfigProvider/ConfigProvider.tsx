import { createContext, useContext } from "react";
import { Size, TextDirection } from "../utils/constant";
import { NavMode, ThemeMode } from "../../../constants/theme.constant";

type GlobalConfigType = {
  themeColor: string;
  direction: TextDirection;
  mode: ThemeMode;
  locale: "en";
  primaryColorLevel: number;
  cardBordered: boolean;
  controlSize: Size;
  navMode: NavMode;
};

export const defaultConfig: GlobalConfigType = {
  themeColor: "indigo",
  direction: "ltr",
  mode: "light",
  locale: "en",
  primaryColorLevel: 600,
  cardBordered: false,
  controlSize: "md",
  navMode: "light",
};

export const ConfigContext = createContext(defaultConfig);

const ConfigProvider = ConfigContext.Provider;

export const ConfigConsumer = ConfigContext.Consumer;

export function useConfig() {
  return useContext(ConfigContext);
}

export default ConfigProvider;
