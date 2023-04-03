import {
  Direction,
  LayoutType,
  NavMode,
  ThemeMode,
} from "../constants/theme.constant";
import { Size } from "../components/ui/utils/constant";

/**
 * Since some configurations need to be match with specific themes,
 * we recommend to use the configuration that generated from demo.
 */

type ThemeConfig = {
  themeColor: "indigo";
  direction: Direction;
  mode: ThemeMode;
  locale: "en";
  primaryColorLevel: number;
  cardBordered: boolean;
  panelExpand: boolean;
  controlSize: Size;
  navMode: NavMode;
  layout: {
    type: LayoutType;
    sideNavCollapse: boolean;
  };
};

export const themeConfig: ThemeConfig = {
  themeColor: "indigo",
  direction: "ltr",
  mode: "light",
  locale: "en",
  primaryColorLevel: 600,
  cardBordered: true,
  panelExpand: false,
  controlSize: "md",
  navMode: "light",
  layout: {
    type: "modern",
    sideNavCollapse: false,
  },
};
