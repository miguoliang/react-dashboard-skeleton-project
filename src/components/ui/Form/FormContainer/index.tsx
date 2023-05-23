import React from "react";
import {
  FormContextConsumer,
  FormContextProvider,
  FormContextType,
} from "../context";
import { useConfig } from "../../ConfigProvider";
import classNames from "classnames";

type FormContainerProps = Partial<FormContextType> &
  JSX.IntrinsicElements["div"];

const FormContainer = (props: FormContainerProps) => {
  const { controlSize } = useConfig();

  const {
    children,
    labelWidth = 100,
    layout = "vertical",
    size = controlSize,
    className,
  } = props;

  return (
    <FormContextProvider value={{ labelWidth, layout, size }}>
      <FormContextConsumer>
        {(context) => {
          return (
            <div
              className={classNames(
                "form-container",
                context.layout,
                className,
              )}
            >
              {children}
            </div>
          );
        }}
      </FormContextConsumer>
    </FormContextProvider>
  );
};

export default FormContainer;
