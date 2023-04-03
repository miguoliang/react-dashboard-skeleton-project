import React, { forwardRef } from "react";
import { TabsContextProvider } from "./context";
import useControllableState from "../hooks/useControllableState";
import classNames from "classnames";
import { noop } from "lodash";

export type TabVariantType = "underline" | "pill";

type TabsProps = Partial<{
  variant: "underline" | "pill";
  defaultValue: string;
  value: string;
  onChange: (val: string) => void;
}> &
  Omit<JSX.IntrinsicElements["div"], "onChange">;

const Tabs = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const {
    value: valueProp,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange = noop,
    defaultValue,
    variant,
    className,
    ...rest
  } = props;

  const [value, setValue] = useControllableState({
    prop: valueProp,
    onChange: onChange,
    defaultProp: defaultValue,
  });

  const tabsClass = classNames("tabs", className);

  return (
    <TabsContextProvider
      value={{
        value: value,
        onValueChange: setValue,
        variant,
      }}
    >
      <div className={tabsClass} {...rest} ref={ref} />
    </TabsContextProvider>
  );
});

export default Tabs;
