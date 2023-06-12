import React, {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { clamp, padTime } from "./utils";
import { CustomRefElementProps } from "../utils/constant";
import { useMergeRefs } from "@chakra-ui/react";

type TimeInputFieldProps = CustomRefElementProps<
  {
    className?: string;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (
      value: string,
      triggerShift: boolean,
      forceTriggerShift?: boolean,
    ) => void;
    setValue?: (value: string) => void;
    withSeparator?: boolean;
    max?: number;
    min?: number;
    value: string;
  },
  "input"
>;

const TimeInputField = forwardRef<HTMLInputElement, TimeInputFieldProps>(
  (props, ref) => {
    const {
      className,
      onFocus,
      onBlur,
      onChange,
      setValue,
      withSeparator = false,
      max = 0,
      min = 0,
      value,
      ...rest
    } = props;

    const [digitsEntered, setDigitsEntered] = useState(0);

    const inputRef = useRef<HTMLInputElement>();

    const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      typeof onFocus === "function" && onFocus(event);
      inputRef.current?.select();
      setDigitsEntered(0);
    };

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      typeof onBlur === "function" && onBlur(event);
      if (digitsEntered === 1) {
        typeof onChange === "function" &&
          onChange(event.currentTarget.value, false);
      }
    };

    const handleClick: MouseEventHandler = (event) => {
      event.stopPropagation();
      inputRef.current?.select();
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        const padded = padTime(
          clamp(
            parseInt(event.currentTarget.value, 10) + 1,
            min,
            max,
          ).toString(),
        );

        if (value !== padded) {
          onChange?.(padded, false);
        }
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const padded = padTime(
          clamp(
            parseInt(event.currentTarget.value, 10) - 1,
            min,
            max,
          ).toString(),
        );

        if (value !== padded) {
          onChange?.(padded, false);
        }
      }
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setDigitsEntered(digitsEntered + 1);

      const _val = parseInt(event.currentTarget.value, 10).toString();

      if (_val === "0" && digitsEntered === 0) {
        setValue?.("00");
        return;
      }
      onChange?.(_val, true, digitsEntered > 0);
    };

    return (
      <>
        <input
          type="text"
          inputMode="numeric"
          ref={useMergeRefs(inputRef, ref)}
          onChange={handleChange}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          value={value}
          className={classNames("time-input-field", className)}
          {...rest}
        />
        {withSeparator && <span> : </span>}
      </>
    );
  },
);

export default TimeInputField;
