import { createContext } from "react";

const GroupContext = createContext<any>(null);

export const GroupContextProvider = GroupContext.Provider;

export const GroupContextConsumer = GroupContext.Consumer;

export default GroupContext;
