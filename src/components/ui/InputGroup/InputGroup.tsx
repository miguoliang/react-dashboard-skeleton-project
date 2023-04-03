import React from "react";
import classNames from "classnames";
import { useConfig } from "../ConfigProvider";
import { useForm } from "../Form/context";
import {
  InputGroupContextConsumer,
  InputGroupContextProvider,
  InputGroupContextType,
} from "./context";

const InputGroup = React.forwardRef<
  HTMLDivElement,
  InputGroupContextType & JSX.IntrinsicElements["div"]
>((props, ref) => {
  const { children, className, size } = props;

  const { controlSize } = useConfig();
  const formControlSize = useForm().size;

  const inputGroupSize = size || formControlSize || controlSize;

  const inputGroupClass = classNames("input-group", className);

  return (
    <InputGroupContextProvider
      value={{
        size: inputGroupSize,
      }}
    >
      <InputGroupContextConsumer>
        {() => {
          return (
            <div ref={ref} className={inputGroupClass}>
              {children}
            </div>
          );
        }}
      </InputGroupContextConsumer>
    </InputGroupContextProvider>
  );
});

export default InputGroup;
