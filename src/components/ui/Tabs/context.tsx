import { createContext, useContext } from "react";
import { TabVariantType } from "./Tabs";

const TabsContext = createContext<
  Partial<{
    variant: TabVariantType;
    value: string;
    onValueChange: (value: string) => void;
  }>
>({});

export const TabsContextProvider = TabsContext.Provider;

export const TabsContextConsumer = TabsContext.Consumer;

export function useTabs() {
  return useContext(TabsContext);
}

export default TabsContext;
