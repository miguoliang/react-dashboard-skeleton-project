import React, { ChangeEvent } from "react";

type RadioGroupContextType = Partial<{
  name: string;
  disabled: boolean;
  value: any;
  onChange: (value: any, event: ChangeEvent<HTMLInputElement>) => void;
  color: string;
  vertical: boolean;
  radioGutter: any;
}>;

const RadioGroupContext = React.createContext<RadioGroupContextType>({});

export const RadioGroupContextProvider = RadioGroupContext.Provider;

export default RadioGroupContext;
