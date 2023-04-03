import { FunctionType } from "constants/types";
import React from "react";

export type CheckBoxGroupContext = {
  name?: string;
  value?: any[];
  onChange?: FunctionType;
  color?: string;
};

const CheckboxGroupContext = React.createContext<CheckBoxGroupContext>({});

export const CheckboxGroupContextProvider = CheckboxGroupContext.Provider;

export default CheckboxGroupContext;
