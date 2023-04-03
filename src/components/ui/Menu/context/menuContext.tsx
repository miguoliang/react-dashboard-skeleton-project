import { createContext } from "react";
import { NavMode } from "../../../../constants/theme.constant";

const MenuContext = createContext<{
  variant?: NavMode;
  sideCollapsed?: boolean;
  onSelect?: (eventKey: string, event: React.MouseEvent<Element>) => void;
  menuItemHeight?: number;
  defaultActiveKeys?: string[];
  defaultExpandedKeys?: string[];
}>({});

export const MenuContextProvider = MenuContext.Provider;

export const MenuContextConsumer = MenuContext.Consumer;

export default MenuContext;
