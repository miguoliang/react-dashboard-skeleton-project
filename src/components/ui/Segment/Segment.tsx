import React, { forwardRef, useCallback, useState } from "react";
import classNames from "classnames";
import { SegmentContextProvider } from "./context";
import { useForm } from "../Form/context";
import { useInputGroup } from "../InputGroup/context";
import { useConfig } from "../ConfigProvider";
import { Size } from "../utils/constant";
import SegmentItem from "./SegmentItem";

const Segment = forwardRef<
  HTMLDivElement,
  {
    selectionType?: "single" | "multiple";
    value?: string[];
    size?: Size;
    children?: React.ReactElement<typeof SegmentItem>[];
    className?: string;
    onChange?: (value: string[]) => void;
  } & Record<string, any>
>((props, ref) => {
  const {
    value: valueProp = [],
    onChange,
    children,
    className,
    selectionType = "single",
    size = useInputGroup().size || useForm().size || useConfig().controlSize,
    ...rest
  } = props;

  const [value, setValue] = useState<string[]>(valueProp);

  const onActive = useCallback((itemValue: string[]) => {
    setValue(itemValue);
    onChange?.(itemValue);
  }, []);

  const onDeactivate = useCallback(
    (itemValue: string) => {
      if (selectionType === "single") {
        setValue([]);
      } else {
        setValue((prevValue: string[] = []) => {
          return prevValue.filter((value) => value !== itemValue);
        });
      }
      onChange?.(value);
    },
    [setValue, selectionType],
  );

  return (
    <SegmentContextProvider
      value={{
        value,
        onActive: onActive,
        onDeactivate: onDeactivate,
        size,
        selectionType,
      }}
    >
      <div ref={ref} className={classNames("segment", className)} {...rest}>
        {children}
      </div>
    </SegmentContextProvider>
  );
});

export default Segment;
