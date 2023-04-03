import { createContext, useContext } from "react";
import { Layout, Size } from "../utils/constant";

export type FormContextType = {
  labelWidth: number;
  layout: Layout;
  size?: Size;
};

const FormContext = createContext<FormContextType>({
  layout: "vertical",
  labelWidth: 100,
});

export const FormContextProvider = FormContext.Provider;

export const FormContextConsumer = FormContext.Consumer;

export function useForm() {
  return useContext(FormContext);
}

export default FormContext;
