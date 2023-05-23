import React, {
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import dayjs from "dayjs";
import useControllableState from "../hooks/useControllableState";
import useMergedRef from "../hooks/useMergeRef";
import Calendar from "./Calendar";
import BasePicker, { BasePickerProps } from "./BasePicker";
import { useConfig } from "../ConfigProvider";
import capitalize from "../utils/capitalize";
import { Size } from "../utils/constant";
import { DayProps } from "./tables/components/props/getDayProps";

const DEFAULT_INPUT_FORMAT = "YYYY-MM-DD";

export type DatePickerProps = Partial<{
  closePickerOnChange: boolean;
  labelFormat: {
    month: string;
    year: string;
  };
  defaultOpen: boolean;
  firstDayOfWeek:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  dateViewCount: number;
  dayClassName: string | ((date: dayjs.ConfigType, v: DayProps) => string);
  dayStyle:
    | React.CSSProperties
    | ((date: dayjs.ConfigType, v: DayProps) => React.CSSProperties);
  defaultMonth: dayjs.ConfigType;
  defaultValue: dayjs.ConfigType;
  defaultView: "month" | "year";
  disableDate: (date: dayjs.ConfigType) => boolean;
  enableHeaderLabel: boolean;
  disableOutOfMonth: boolean;
  hideOutOfMonthDates: boolean;
  hideWeekday: boolean;
  inputFormat: string;
  label: string;
  locale: string;
  maxDate: dayjs.ConfigType;
  minDate: dayjs.ConfigType;
  openPickerOnClear: boolean;
  renderDay: (date: dayjs.ConfigType) => React.ReactNode;
  style: React.CSSProperties;
  value: dayjs.ConfigType;
  weekendDays: number[];
  yearLabelFormat: string;
  hideWeekdays: boolean;
  inputSize: Size;
}> &
  BasePickerProps;

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (props, ref) => {
    const {
      className,
      clearable = true,
      clearButton,
      closePickerOnChange,
      dateViewCount,
      dayClassName,
      dayStyle,
      defaultMonth,
      defaultOpen = false,
      defaultValue,
      defaultView,
      disabled = false,
      disableDate,
      enableHeaderLabel,
      disableOutOfMonth,
      firstDayOfWeek = "monday",
      hideOutOfMonthDates,
      hideWeekdays,
      inputFormat,
      inputPrefix,
      inputSuffix,
      inputtable,
      labelFormat = { month: "MMM", year: "YYYY" },
      locale,
      maxDate,
      minDate,
      name = "date",
      onBlur,
      onChange,
      onFocus,
      onDropdownClose,
      onDropdownOpen,
      openPickerOnClear = false,
      renderDay,
      size,
      style,
      type,
      value,
      weekendDays,
      yearLabelFormat,
      ...rest
    } = props;

    const { locale: themeLocale } = useConfig();

    const finalLocale = locale || themeLocale;

    const dateFormat =
      type === "date"
        ? DEFAULT_INPUT_FORMAT
        : inputFormat || DEFAULT_INPUT_FORMAT;

    const [dropdownOpened, setDropdownOpened] = useState(defaultOpen);

    const inputRef = useRef<HTMLInputElement>();

    const [lastValidValue, setLastValidValue] = useState<typeof defaultValue>(
      defaultValue ?? null,
    );

    const [_value, setValue] = useControllableState({
      prop: value,
      defaultProp: defaultValue,
      onChange,
    });

    const [calendarMonth, setCalendarMonth] = useState(
      _value || defaultMonth || new Date(),
    );

    const [focused, setFocused] = useState(false);

    const [inputState, setInputState] = useState("");

    const closeDropdown = () => {
      setDropdownOpened(false);
      onDropdownClose?.();
    };

    const openDropdown = () => {
      setDropdownOpened(true);
      onDropdownOpen?.();
    };

    useEffect(() => {
      if (value === null && !focused) {
        setInputState("");
      }

      if (value instanceof Date && !focused) {
        setInputState(
          capitalize(dayjs(value).locale(finalLocale).format(dateFormat)),
        );
      }
    }, [value, focused, themeLocale]);

    useEffect(() => {
      if (defaultValue instanceof Date && inputState && !focused) {
        setInputState(
          capitalize(dayjs(_value).locale(finalLocale).format(dateFormat)),
        );
      }
    }, [themeLocale]);

    const handleValueChange = (date: dayjs.ConfigType) => {
      setValue(date);
      setInputState(
        capitalize(
          dayjs(date as dayjs.ConfigType)
            .locale(finalLocale)
            .format(dateFormat),
        ),
      );
      closePickerOnChange && closeDropdown();
      window.setTimeout(() => inputRef.current?.focus(), 0);
    };

    const handleClear = () => {
      setValue(null);
      setLastValidValue(null);
      setInputState("");
      openPickerOnClear && openDropdown();
      inputRef.current?.focus();
    };

    const parseDate = (date: string) =>
      dayjs(date, dateFormat, finalLocale).toDate();

    const setDateFromInput = () => {
      let date = typeof _value === "string" ? parseDate(_value) : _value;

      if (maxDate && dayjs(date).isAfter(maxDate)) {
        date = maxDate;
      }

      if (minDate && dayjs(date).isBefore(minDate)) {
        date = minDate;
      }

      if (dayjs(date).isValid()) {
        setValue(date);
        setLastValidValue(date);
        setInputState(
          capitalize(dayjs(date).locale(finalLocale).format(dateFormat)),
        );
        setCalendarMonth(date);
      } else {
        setValue(lastValidValue);
      }
    };

    const handleInputBlur: FocusEventHandler = (event) => {
      typeof onBlur === "function" && onBlur(event);
      setFocused(false);

      if (inputtable) {
        setDateFromInput();
      }
    };

    const handleKeyDown: KeyboardEventHandler = (event) => {
      if (event.key === "Enter" && inputtable) {
        closeDropdown();
        setDateFromInput();
      }
    };

    const handleInputFocus: FocusEventHandler = (event) => {
      typeof onFocus === "function" && onFocus(event);
      setFocused(true);
    };

    const handleChange = (date: dayjs.ConfigType) => {
      openDropdown();

      setValue(date);
      setLastValidValue(date);
      setInputState(dayjs(date).locale(finalLocale).format(dateFormat));
      setCalendarMonth(date);
    };

    return (
      <BasePicker
        inputtable={inputtable}
        dropdownOpened={dropdownOpened}
        setDropdownOpened={setDropdownOpened}
        ref={useMergedRef(ref, inputRef)}
        size={size}
        style={style}
        className={className}
        onChange={handleChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        name={name}
        inputLabel={inputState}
        clearable={type === "date" ? false : clearable && !!_value && !disabled}
        clearButton={clearButton}
        onClear={handleClear}
        disabled={disabled}
        onDropdownClose={onDropdownClose}
        onDropdownOpen={onDropdownOpen}
        type={type}
        inputPrefix={inputPrefix}
        inputSuffix={inputSuffix}
        {...rest}
      >
        <Calendar
          locale={finalLocale}
          month={inputtable ? calendarMonth : undefined}
          defaultMonth={
            defaultMonth || (_value instanceof Date ? _value : new Date())
          }
          onMonthChange={setCalendarMonth}
          value={
            _value instanceof Date ? _value : _value && dayjs(_value).toDate()
          }
          onChange={(date) => handleValueChange(date as dayjs.ConfigType)}
          labelFormat={labelFormat}
          dayClassName={dayClassName}
          dayStyle={dayStyle}
          disableOutOfMonth={disableOutOfMonth}
          minDate={minDate}
          maxDate={maxDate}
          disableDate={disableDate}
          firstDayOfWeek={firstDayOfWeek}
          preventFocus={inputtable}
          dateViewCount={dateViewCount}
          enableHeaderLabel={enableHeaderLabel}
          defaultView={defaultView}
          hideOutOfMonthDates={hideOutOfMonthDates}
          hideWeekdays={hideWeekdays}
          renderDay={renderDay}
          weekendDays={weekendDays}
          yearLabelFormat={yearLabelFormat}
        />
      </BasePicker>
    );
  },
);

export default DatePicker;
