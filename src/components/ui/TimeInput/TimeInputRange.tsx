import React, {
  CSSProperties,
  forwardRef,
  ReactNode,
  RefObject,
  useRef,
  useState,
} from "react";
import useUniqueId from "../hooks/useUniqueId";
import useMergedRef from "../hooks/useMergeRef";
import useDidUpdate from "../hooks/useDidUpdate";
import TimeInput from "./TimeInput";
import CloseButton from "../CloseButton";
import { HiOutlineClock } from "react-icons/hi";
import Input from "../Input";
import { Size } from "../utils/constant";
import { FieldInputProps, FormikProps } from "formik";

type TimeInputRangeProps = Partial<{
  invalid: boolean;
  className: string;
  style: CSSProperties;
  size: Size;
  id: string;
  value: Date[];
  defaultValue: Date[];
  onChange: (value: Date[]) => void;
  showSeconds: boolean;
  clearable: boolean;
  format: "12" | "24";
  amLabel: string;
  pmLabel: string;
  name: string;
  timeFieldPlaceholder: string;
  amPmPlaceholder: string;
  separator: string;
  disabled: boolean;
  nextRef: RefObject<any>;
  field: FieldInputProps<string>;
  form: FormikProps<any>;
  timeFieldClass: string;
  prefix: ReactNode;
  suffix: ReactNode;
}>;

const TimeInputRange = forwardRef<HTMLInputElement, TimeInputRangeProps>(
  (props, ref) => {
    const {
      invalid,
      className,
      style,
      size,
      id,
      value,
      defaultValue = [],
      onChange,
      showSeconds = false,
      clearable = false,
      format = "24",
      name,
      timeFieldPlaceholder = "--",
      amPmPlaceholder = "am",
      separator = "~",
      disabled = false,
      prefix,
      suffix = <HiOutlineClock className="text-lg" />,
      ...rest
    } = props;

    const uuid = useUniqueId(id ?? "");

    const fromTimeRef = useRef<HTMLInputElement | null>(null);
    const toTimeRef = useRef<HTMLInputElement | null>(null);
    const [_value, setValue] = useState<Date[]>(value ?? defaultValue);

    useDidUpdate(() => {
      typeof onChange === "function" && onChange(_value);
    }, [_value]);

    useDidUpdate(() => {
      if (
        (value && value[0].getTime() !== _value[0].getTime()) ||
        (value && value[1].getTime() !== _value[1].getTime())
      ) {
        setValue(value);
      }
    }, [value]);

    const handleClear = () => {
      setValue([]);
      fromTimeRef.current?.focus();
    };

    const suffixSlot = clearable ? (
      <CloseButton onClick={handleClear} />
    ) : (
      <>{suffix}</>
    );

    const forwardProps = {
      amPmPlaceholder,
      disabled,
      format,
      size,
      timeFieldPlaceholder,
      showSeconds,
    };

    return (
      <Input
        asElement="div"
        invalid={invalid}
        onClick={() => {
          fromTimeRef.current?.focus();
        }}
        size={size}
        className={className}
        style={style}
        disabled={disabled}
        suffix={suffixSlot}
        prefix={prefix}
        {...rest}
      >
        <div className="time-input-wrapper">
          <TimeInput
            ref={useMergedRef(fromTimeRef, ref)}
            value={_value[0]}
            onChange={(date) => setValue([date ?? new Date(), _value[1]])}
            name={name}
            nextRef={toTimeRef}
            id={uuid}
            clearable={false}
            suffix={null}
            {...forwardProps}
          />

          <span className="time-input-separator">{separator}</span>

          <TimeInput
            ref={toTimeRef}
            value={_value[1]}
            onChange={(date) => setValue([_value[0], date ?? new Date()])}
            clearable={false}
            suffix={null}
            {...forwardProps}
          />
        </div>
      </Input>
    );
  },
);

export default TimeInputRange;
