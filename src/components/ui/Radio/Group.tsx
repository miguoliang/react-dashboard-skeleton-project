import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import classNames from "classnames";
import { RadioGroupContextProvider } from "./context";
import { CustomRefElementProps } from "../utils/constant";

type GroupProps = CustomRefElementProps<
  Partial<{
    vertical: boolean;
    color: string;
    value: any;
    onChange: (value: any, event: ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    name: string;
    radioGutter: number;
    className: string;
  }>,
  "div"
>;

const Group = React.forwardRef<HTMLDivElement, GroupProps>((props, ref) => {
  const {
    color,
    disabled,
    name,
    onChange,
    radioGutter = 3,
    value: valueProp,
    vertical = false,
    className,
    ...rest
  } = props;

  const [value, setValue] = useState(valueProp);

  const onRadioGroupChange = useCallback(
    (nextValue: any, e: ChangeEvent<HTMLInputElement>) => {
      setValue(nextValue);
      onChange?.(nextValue, e);
    },
    [onChange, setValue]
  );

  const contextValue = useMemo(
    () => ({
      vertical,
      name,
      value: typeof value === "undefined" ? null : value,
      color,
      disabled,
      radioGutter,
      onChange: onRadioGroupChange,
    }),
    [disabled, onRadioGroupChange, vertical, name, color, radioGutter, value]
  );

  const radioGroupClass = classNames(
    "radio-group",
    vertical && "vertical",
    className
  );

  const groupChild = () => {
    const { children, id } = props;
    return (
      <div id={id} ref={ref} className={radioGroupClass} {...rest}>
        {children}
      </div>
    );
  };

  return (
    <RadioGroupContextProvider value={contextValue}>
      {groupChild()}
    </RadioGroupContextProvider>
  );
});

Group.defaultProps = {
  vertical: false,
  radioGutter: 3,
};

export default Group;
