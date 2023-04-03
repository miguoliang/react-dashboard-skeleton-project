import React from "react";
import { DropdownMenuItemClickEventHandler } from "../Menu";

const MenuContext = React.createContext<{
  activeKey?: string;
  onSelect?: DropdownMenuItemClickEventHandler;
} | null>(null);

export const MenuContextProvider = MenuContext.Provider;

export default MenuContext;
