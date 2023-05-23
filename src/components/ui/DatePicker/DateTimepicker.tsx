import {
  FocusEventHandler,
  forwardRef,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import dayjs from "dayjs";
import useControllableState from "../hooks/useControllableState";
import useMergedRef from "../hooks/useMergeRef";
import capitalize from "../utils/capitalize";
import Calendar from "./Calendar";
import BasePicker from "./BasePicker";
import Button from "../Buttons";
import { useConfig } from "../ConfigProvider";
import { DatePickerProps } from "./DatePicker";
import { TimeInput } from "../TimeInput";

const DEFAULT_INPUT_FORMAT = "DD-MMM-YYYY hh:mm a";

type DateTimepickerProps = Partial<{
  okButtonContent: ReactNode;
  amPm: boolean;
}> &
  DatePickerProps;

const DateTimepicker = forwardRef<HTMLInputElement, DateTimepickerProps>(
  (props, ref) => {
    const {
      amPm = true,
      className,
      clearable = true,
      clearButtonLabel,
      closePickerOnChange = false,
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
      labelFormat = {
        month: "MMM",
        year: "YYYY",
      },
      locale,
      maxDate,
      minDate,
      name = "dateTime",
      okButtonContent = "OK",
      onBlur,
      onChange,
      onFocus,
      onDropdownClose,
      onDropdownOpen,
      openPickerOnClear,
      renderDay,
      size,
      value,
      weekendDays,
      yearLabelFormat,
      ...rest
    } = props;

    const { locale: themeLocale } = useConfig();

    const finalLocale = locale || themeLocale;

    const dateFormat = inputFormat || DEFAULT_INPUT_FORMAT;

    const [dropdownOpened, setDropdownOpened] = useState(defaultOpen);

    const inputRef = useRef<HTMLInputElement>();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setLastValidValue] = useState<dayjs.ConfigType>(defaultValue);
    const [_value, setValue] = useControllableState({
      prop: value,
      defaultProp: defaultValue,
      onChange,
    });

    const [calendarMonth, setCalendarMonth] = useState(
      _value || defaultMonth || new Date(),
    );

    const [focused, setFocused] = useState(false);
    const [inputState, setInputState] = useState(
      _value instanceof Date
        ? capitalize(dayjs(_value).locale(finalLocale).format(dateFormat))
        : "",
    );

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
        setInputState(dayjs(value).locale(finalLocale).format(dateFormat));
      }
    }, [value, focused]);

    const handleValueChange = (date: dayjs.ConfigType) => {
      const newDate = dayjs(date).toDate();
      if (_value) {
        newDate.setHours(_value.getHours());
        newDate.setMinutes(_value.getMinutes());
      } else {
        const now = new Date(Date.now());
        newDate.setHours(now.getHours());
        newDate.setMinutes(now.getMinutes());
      }
      setValue(newDate);
      if (!value && !closePickerOnChange) {
        setInputState(dayjs(date).locale(finalLocale).format(dateFormat));
      }
      closePickerOnChange &&
        setInputState(
          capitalize(dayjs(date).locale(finalLocale).format(dateFormat)),
        );
      closePickerOnChange && closeDropdown();
      window.setTimeout(() => inputRef.current?.focus(), 0);
    };

    const handleClear: MouseEventHandler = () => {
      setValue(null);
      setLastValidValue(null);
      setInputState("");
      openPickerOnClear && openDropdown();
      inputRef.current?.focus();
      onChange?.(null);
    };

    const handleInputBlur: FocusEventHandler = (e) => {
      typeof onBlur === "function" && onBlur(e);
      setFocused(false);
    };

    const handleInputFocus: FocusEventHandler = (e) => {
      typeof onFocus === "function" && onFocus(e);
      setFocused(true);
    };

    const handleChange = (date: dayjs.ConfigType) => {
      openDropdown();

      setValue(date);
      setLastValidValue(date);
      closePickerOnChange &&
        setInputState(
          capitalize(dayjs(date).locale(finalLocale).format(dateFormat)),
        );
      setCalendarMonth(date);
    };

    const handleTimeChange = (time: Date | null) => {
      time = time || new Date();
      const newDateTime = new Date(
        _value.getFullYear(),
        _value.getMonth(),
        _value.getDate(),
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
        time.getMilliseconds(),
      );
      setValue(newDateTime);

      if (!value && !closePickerOnChange) {
        setInputState(
          capitalize(dayjs(newDateTime).locale(finalLocale).format(dateFormat)),
        );
      }

      closePickerOnChange &&
        setInputState(
          capitalize(dayjs(newDateTime).locale(finalLocale).format(dateFormat)),
        );
      closePickerOnChange && closeDropdown();
    };

    const handleOk = () => {
      setInputState(
        capitalize(dayjs(_value).locale(finalLocale).format(dateFormat)),
      );
      closeDropdown();
      window.setTimeout(() => inputRef.current?.focus(), 0);
      onChange?.(_value);
    };

    return (
      <BasePicker
        dropdownOpened={dropdownOpened}
        setDropdownOpened={setDropdownOpened}
        ref={useMergedRef(ref, inputRef)}
        className={className}
        onChange={handleChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        name={name}
        inputLabel={inputState}
        clearable={clearable && !!_value && !disabled}
        clearButtonLabel={clearButtonLabel}
        onClear={handleClear}
        disabled={disabled}
        size={size}
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
          preventFocus={false}
          dateViewCount={dateViewCount}
          enableHeaderLabel={enableHeaderLabel}
          defaultView={defaultView}
          hideOutOfMonthDates={hideOutOfMonthDates}
          hideWeekdays={hideWeekdays}
          renderDay={renderDay}
          weekendDays={weekendDays}
          yearLabelFormat={yearLabelFormat}
        />
        <div className="flex items-center gap-4 mt-4">
          <TimeInput
            disabled={!_value}
            value={_value}
            onChange={handleTimeChange}
            format={amPm ? "12" : "24"}
            clearable={false}
            size="sm"
          />
          <Button size="sm" disabled={!_value} onClick={handleOk}>
            {okButtonContent}
          </Button>
        </div>
      </BasePicker>
    );
  },
);

export default DateTimepicker;
