import React, {
  CSSProperties,
  forwardRef,
  ReactNode,
  RefObject,
  useRef,
  useState,
} from "react";
import useUniqueId from "../hooks/useUniqueId";
import useDidUpdate from "../hooks/useDidUpdate";
import TimeInputField from "./TimeInputField";
import AmPmInput from "./AmPmInput";
import Input from "../Input";
import {
  createAmPmHandler,
  createTimeHandler,
  getDate,
  getTimeValues,
} from "./utils";
import { HiOutlineClock } from "react-icons/hi";
import { Size } from "../utils/constant";
import { FieldInputProps, FormikProps } from "formik";
import { CloseButton, useMergeRefs } from "@chakra-ui/react";

type TimeInputProps = Partial<{
  showSeconds: boolean;
  clearable: boolean;
  format: "24" | "12";
  amLabel: string;
  pmLabel: string;
  timeFieldPlaceholder: string;
  amPmPlaceholder: string;
  disabled: boolean;
  className: string;
  defaultValue: Date;
  field: FieldInputProps<string>;
  form: FormikProps<any>;
  id: string;
  invalid: boolean;
  prefix: ReactNode;
  name: string;
  nextRef: RefObject<any>;
  size: Size;
  style: CSSProperties;
  suffix: ReactNode;
  timeFieldClass: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
}>;

const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>((props, ref) => {
  const {
    amLabel = "am",
    amPmPlaceholder = "am",
    className,
    clearable = true,
    defaultValue,
    disabled = false,
    format = "24",
    field,
    form,
    id,
    invalid,
    name,
    nextRef,
    onChange,
    pmLabel = "pm",
    prefix,
    showSeconds = false,
    size,
    style,
    suffix = <HiOutlineClock className="text-lg" />,
    timeFieldPlaceholder = "--",
    timeFieldClass,
    value,
    ...rest
  } = props;

  const uuid = useUniqueId(id ?? "");

  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);
  const amPmRef = useRef<HTMLInputElement>(null);
  const [time, setTime] = useState(
    getTimeValues(value || defaultValue, format, amLabel, pmLabel),
  );
  const [_value, setValue] = useState<Date | null | undefined>(
    value || defaultValue,
  );

  useDidUpdate(() => {
    setTime(getTimeValues(_value, format, amLabel, pmLabel));
  }, [_value, format, amLabel, pmLabel]);

  useDidUpdate(() => {
    if (value?.getTime() !== _value?.getTime()) {
      setValue(value);
    }
  }, [value]);

  const setDate = (change: {
    hours?: string;
    minutes?: string;
    seconds?: string;
    amPm?: string;
  }) => {
    const timeWithChange = { ...time, ...change };
    const newDate = getDate(
      timeWithChange.hours,
      timeWithChange.minutes,
      timeWithChange.seconds,
      format,
      pmLabel,
      timeWithChange.amPm,
    );
    setValue(newDate);
    typeof onChange === "function" && onChange(newDate);
  };

  const handleHoursChange = createTimeHandler({
    onChange: (val, carryOver) => {
      setDate({
        hours: val,
        minutes: carryOver ?? time.minutes,
      });
    },
    min: format === "12" ? 1 : 0,
    max: format === "12" ? 12 : 23,
    nextRef: minutesRef,
    nextMax: 59,
  });

  const handleMinutesChange = createTimeHandler({
    onChange: (val, carryOver) => {
      setDate({
        minutes: val,
        seconds: carryOver ?? time.seconds,
      });
    },
    min: 0,
    max: 59,
    nextRef: showSeconds ? secondsRef : format === "12" ? amPmRef : nextRef,
    nextMax: showSeconds ? 59 : undefined,
  });

  const handleSecondsChange = createTimeHandler({
    onChange: (val) => {
      setDate({ seconds: val });
    },
    min: 0,
    max: 59,
    nextRef: format === "12" ? amPmRef : nextRef,
  });

  const handleAmPmChange = createAmPmHandler({
    amLabel,
    pmLabel,
    onChange: (val: string) => {
      setDate({ amPm: val });
    },
    nextRef,
  });

  const handleClear = () => {
    setTime({ hours: "", minutes: "", seconds: "", amPm: "" });
    setValue(null);
    onChange?.(null);
    hoursRef.current?.focus();
  };

  const suffixSlot =
    clearable && _value ? <CloseButton onClick={handleClear} /> : suffix;

  return (
    <Input
      asElement="div"
      invalid={invalid}
      disabled={disabled}
      onClick={() => hoursRef.current?.focus()}
      style={style}
      className={className}
      size={size}
      prefix={prefix}
      suffix={suffixSlot}
      field={field}
      form={form}
      {...rest}
    >
      <div className="time-input-wrapper">
        <TimeInputField
          ref={useMergeRefs(hoursRef, ref)}
          value={time.hours}
          onChange={handleHoursChange}
          setValue={(val) => setTime((current) => ({ ...current, hours: val }))}
          id={uuid}
          className={timeFieldClass}
          withSeparator
          max={format === "12" ? 12 : 23}
          placeholder={timeFieldPlaceholder}
          aria-label="hours"
          disabled={disabled}
          name={name}
        />
        <TimeInputField
          ref={minutesRef}
          value={time.minutes}
          onChange={handleMinutesChange}
          setValue={(val) =>
            setTime((current) => ({ ...current, minutes: val }))
          }
          className={timeFieldClass}
          withSeparator={showSeconds}
          max={59}
          placeholder={timeFieldPlaceholder}
          aria-label="minutes"
          disabled={disabled}
        />
        {showSeconds && (
          <TimeInputField
            ref={secondsRef}
            value={time.seconds}
            onChange={handleSecondsChange}
            setValue={(val) =>
              setTime((current) => ({ ...current, seconds: val }))
            }
            className={timeFieldClass}
            max={59}
            placeholder={timeFieldPlaceholder}
            aria-label="seconds"
            disabled={disabled}
          />
        )}
        {format === "12" && (
          <AmPmInput
            ref={amPmRef}
            value={time.amPm}
            onChange={handleAmPmChange}
            placeholder={amPmPlaceholder}
            amLabel={amLabel}
            pmLabel={pmLabel}
            aria-label="am pm"
            disabled={disabled}
          />
        )}
      </div>
    </Input>
  );
});

export default TimeInput;
