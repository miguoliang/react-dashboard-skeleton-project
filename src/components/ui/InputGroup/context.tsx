import { createContext, useContext } from "react";
import { Size } from "../utils/constant";

export type InputGroupContextType = {
  size?: Size;
};

const InputGroupContext = createContext<InputGroupContextType>({});

export const InputGroupContextProvider = InputGroupContext.Provider;

export const InputGroupContextConsumer = InputGroupContext.Consumer;

export function useInputGroup() {
  return useContext(InputGroupContext);
}

export default InputGroupContext;
