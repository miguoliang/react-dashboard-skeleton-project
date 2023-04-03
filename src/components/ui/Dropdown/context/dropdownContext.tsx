import { createContext } from "react";

const DropdownContext = createContext<{ activeKey?: string }>({});

export const DropdownContextProvider = DropdownContext.Provider;

export const DropdownContextConsumer = DropdownContext.Consumer;

export default DropdownContext;
