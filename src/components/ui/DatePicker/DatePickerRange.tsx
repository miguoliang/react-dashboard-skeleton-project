import React, { forwardRef, useRef, useState } from "react";
import dayjs from "dayjs";
import useMergedRef from "../hooks/useMergeRef";
import capitalize from "../utils/capitalize";
import RangeCalendar from "./RangeCalendar";
import BasePicker from "./BasePicker";
import { useConfig } from "../ConfigProvider";
import { DatePickerProps } from "./DatePicker";
import { DateRange } from "./CalendarBase";
import isNil from "lodash/isNil";

const validationRule = (val: any) =>
  Array.isArray(val) && val.length === 2 && val.every((v) => v instanceof Date);

const isFirstDateSet = (val: any) =>
  Array.isArray(val) && val.length === 2 && val[0] instanceof Date;

type DatePickerRangeProps = Partial<{
  separator: string;
  value: DateRange;
  defaultValue: DateRange;
  onChange: (range: DateRange) => void;
}> &
  Omit<DatePickerProps, "value" | "onChange">;

const DatePickerRange = forwardRef<HTMLInputElement, DatePickerRangeProps>(
  (props, ref) => {
    const {
      className,
      clearable = true,
      clearButton,
      closePickerOnChange = true,
      dateViewCount = 1,
      dayClassName,
      dayStyle,
      defaultMonth,
      defaultOpen = false,
      defaultValue,
      defaultView,
      disabled,
      disableDate,
      enableHeaderLabel,
      disableOutOfMonth,
      firstDayOfWeek = "monday",
      hideOutOfMonthDates,
      hideWeekdays,
      inputFormat,
      inputPrefix,
      inputSuffix,
      labelFormat = {
        month: "MMM",
        year: "YYYY",
      },
      separator = "~",
      locale,
      maxDate,
      minDate,
      onChange,
      onDropdownClose,
      onDropdownOpen,
      openPickerOnClear = false,
      renderDay,
      size,
      style,
      value,
      weekendDays,
      yearLabelFormat,
      ...rest
    } = props;

    const { locale: themeLocale } = useConfig();

    const finalLocale = locale || themeLocale;

    const dateFormat = inputFormat || "YYYY-MM-DD";

    const [dropdownOpened, setDropdownOpened] = useState(defaultOpen);

    const inputRef = useRef<HTMLInputElement>();

    const [_value, setValue] = useState<DateRange | undefined>(
      value || defaultValue || [null, null]
    );

    const handleValueChange = (range: DateRange) => {
      setValue(range);
      if (closePickerOnChange && validationRule(range)) {
        setDropdownOpened(false);
        onDropdownClose?.();
        window.setTimeout(() => inputRef.current?.focus(), 0);
      }
      onChange?.(range);
    };

    const valueValid = validationRule(_value);
    const firstValueValid = isFirstDateSet(_value);

    const firstDateLabel = _value?.at(0)
      ? capitalize(dayjs(_value[0]).locale(finalLocale).format(dateFormat))
      : "";

    const secondDateLabel = _value?.at(1)
      ? capitalize(dayjs(_value[1]).locale(finalLocale).format(dateFormat))
      : "";

    const handleClear = () => {
      setValue([null, null]);
      setDropdownOpened(true);
      openPickerOnClear && onDropdownOpen?.();
      inputRef.current?.focus();
    };

    const handleDropdownToggle = (isOpened: boolean) => {
      if (!isOpened && firstValueValid && isNil(_value?.at(1))) {
        handleClear();
      }
      setDropdownOpened(isOpened);
    };

    return (
      <BasePicker
        dropdownOpened={dropdownOpened}
        setDropdownOpened={handleDropdownToggle}
        ref={useMergedRef(ref, inputRef)}
        size={size}
        style={style}
        className={className}
        inputLabel={
          firstValueValid
            ? `${firstDateLabel} ${separator} ${secondDateLabel}`
            : ""
        }
        clearable={clearable && firstValueValid}
        clearButton={clearButton}
        onClear={handleClear}
        dateViewCount={dateViewCount}
        onDropdownClose={onDropdownClose}
        onDropdownOpen={onDropdownOpen}
        disabled={disabled}
        inputPrefix={inputPrefix}
        inputSuffix={inputSuffix}
        {...rest}
      >
        <RangeCalendar
          locale={finalLocale}
          defaultMonth={valueValid ? _value!.at(0) : defaultMonth}
          value={_value}
          onChange={handleValueChange}
          labelFormat={labelFormat}
          dayClassName={dayClassName}
          dayStyle={dayStyle}
          disableOutOfMonth={disableOutOfMonth}
          minDate={minDate}
          maxDate={maxDate}
          disableDate={disableDate}
          firstDayOfWeek={firstDayOfWeek}
          enableHeaderLabel={enableHeaderLabel}
          dateViewCount={dateViewCount}
          defaultView={defaultView}
          hideOutOfMonthDates={hideOutOfMonthDates}
          hideWeekdays={hideWeekdays}
          renderDay={renderDay}
          weekendDays={weekendDays}
          yearLabelFormat={yearLabelFormat}
        />
      </BasePicker>
    );
  }
);

export default DatePickerRange;
