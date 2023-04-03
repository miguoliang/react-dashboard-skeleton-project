import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import classNames from "classnames";
import { CheckboxGroupContextProvider } from "./context";
import cloneDeep from "lodash/cloneDeep";
import remove from "lodash/remove";
import { isEqual } from "lodash";

export type CheckboxGroupChangeEventHandler = (
  itemValues: any[],
  event: ChangeEventHandler<HTMLInputElement>
) => void;

type GroupProps = Partial<{
  vertical: boolean;
  color: string;
  value: string[];
  onChange: CheckboxGroupChangeEventHandler;
  className: string;
  children: React.ReactNode;
  name: string;
}>;

const Group = React.forwardRef<HTMLDivElement, GroupProps>((props, ref) => {
  const {
    value: valueProp,
    className,
    onChange,
    color,
    vertical,
    name,
    children,
    ...rest
  } = props;

  const [value, setValue] = useState(valueProp);

  const onCheckboxGroupChange = useCallback(
    (itemValue: string, itemChecked: boolean, event: ChangeEventHandler) => {
      const nextValue = cloneDeep(value) || [];
      if (itemChecked) {
        nextValue.push(itemValue);
      } else {
        remove(nextValue, (i) => isEqual(i, itemValue));
      }

      setValue(nextValue);
      onChange?.(nextValue, event);
    },
    [onChange, setValue, value]
  );

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  const checkboxGroupDefaultClass = `inline-flex ${
    vertical ? "flex-col gap-y-2" : ""
  }`;

  const checkBoxGroupClass = classNames(checkboxGroupDefaultClass, className);

  const contextValue = useMemo(
    () => ({
      vertical,
      name,
      value,
      color,
      onChange: onCheckboxGroupChange,
    }),
    [vertical, onCheckboxGroupChange, name, color, value]
  );

  return (
    <CheckboxGroupContextProvider value={contextValue}>
      <div ref={ref} className={checkBoxGroupClass} {...rest}>
        {children}
      </div>
    </CheckboxGroupContextProvider>
  );
});

export default Group;
