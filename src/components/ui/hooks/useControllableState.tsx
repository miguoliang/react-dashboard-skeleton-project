import { FunctionType } from "constants/types";
import { useCallback, useEffect, useRef, useState } from "react";
import useCallbackRef from "./useCallbackRef";
import { noop } from "lodash";

function useUncontrolledState({
  defaultProp,
  onChange,
}: {
  defaultProp: any;
  onChange: FunctionType;
}) {
  const uncontrolledState = useState(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = useRef(value);
  const handleChange = useCallbackRef(onChange);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, handleChange]);

  return uncontrolledState;
}

function useControllableState({
  prop,
  defaultProp,
  onChange = noop,
}: Partial<{
  prop: any;
  defaultProp: any;
  onChange: FunctionType;
}>) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({
    defaultProp,
    onChange,
  });
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;
  const handleChange = useCallbackRef(onChange);

  const setValue = useCallback(
    (nextValue: any) => {
      const setter = nextValue;
      if (isControlled) {
        const value =
          typeof nextValue === "function" ? setter(prop) : nextValue;
        if (value !== prop) {
          handleChange(value);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, handleChange],
  );

  return [value, setValue];
}

export default useControllableState;
