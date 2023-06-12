import React, {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  useRef,
} from "react";
import classNames from "classnames";
import { useMergeRefs } from "@chakra-ui/react";

type AmPmInputProps = {
  className?: string;
  onChange: (value: string, triggerShift: boolean) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  amLabel?: string;
  pmLabel?: string;
  placeholder?: string;
  disabled?: boolean;
};

const AmPmInput = forwardRef<HTMLInputElement, AmPmInputProps>((props, ref) => {
  const { className, onChange, onFocus, value, amLabel, pmLabel, ...rest } =
    props;

  const inputRef = useRef<HTMLInputElement>();

  const handleClick: MouseEventHandler = (event) => {
    event.stopPropagation();
    inputRef.current?.select();
  };

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      onChange((value === amLabel ? pmLabel : amLabel) ?? "", true);
    }
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    typeof onFocus === "function" && onFocus(event);
    inputRef.current?.select();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const lastInputVal = event.target.value.slice(-1).toLowerCase();

    if (lastInputVal === "p") {
      event.preventDefault();
      onChange(pmLabel ?? "", true);
      return;
    }

    if (lastInputVal === "a") {
      event.preventDefault();
      onChange(amLabel ?? "", true);
      return;
    }

    onChange(value.toString(), true);
  };

  return (
    <input
      type="text"
      ref={useMergeRefs(inputRef, ref)}
      onClick={handleClick}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      value={value}
      className={classNames("time-input-field", "am-pm-input", className)}
      {...rest}
    />
  );
});

export default AmPmInput;
