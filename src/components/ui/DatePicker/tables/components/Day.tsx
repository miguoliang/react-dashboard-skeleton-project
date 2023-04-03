import React, { forwardRef } from "react";
import classNames from "classnames";
import { useConfig } from "../../../ConfigProvider";
import dayjs from "dayjs";

function getDayTabIndex({
  focusable,
  hasValue,
  selected,
  firstInMonth,
}: {
  focusable: boolean;
  hasValue: boolean;
  selected: boolean;
  firstInMonth: boolean;
}) {
  if (!focusable) {
    return -1;
  }

  if (hasValue) {
    return selected ? 0 : -1;
  }

  return firstInMonth ? 0 : -1;
}

const Day = forwardRef<
  HTMLButtonElement,
  {
    className?: string;
    value: dayjs.ConfigType;
    selected: boolean;
    weekend: boolean;
    outOfMonth: boolean;
    onMouseEnter: (date: dayjs.ConfigType, event: React.MouseEvent) => void;
    hasValue: boolean;
    firstInRange: boolean;
    lastInRange: boolean;
    inRange: boolean;
    isToday: boolean;
    firstInMonth: boolean;
    focusable: boolean;
    hideOutOfMonthDates: boolean;
    renderDay?: (date: dayjs.ConfigType) => React.ReactNode;
    disabled: boolean;
    selectedInRange?: boolean;
    onClick?: (event: React.MouseEvent) => void;
    onMouseDown?: (event: React.MouseEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    style?: React.CSSProperties;
  }
>((props, ref) => {
  const {
    className,
    value,
    selected,
    weekend,
    outOfMonth,
    onMouseEnter,
    hasValue,
    firstInRange,
    lastInRange,
    inRange,
    isToday,
    firstInMonth,
    focusable,
    hideOutOfMonthDates,
    renderDay,
    disabled,
    ...others
  } = props;

  const { themeColor, primaryColorLevel } = useConfig();

  return (
    <button
      {...others}
      type="button"
      ref={ref}
      disabled={disabled}
      onMouseEnter={(event) => value && onMouseEnter(value, event)}
      tabIndex={getDayTabIndex({
        focusable,
        hasValue,
        selected,
        firstInMonth,
      })}
      className={classNames(
        "date-picker-cell-content",
        disabled && "date-picker-cell-disabled",
        isToday && `border border-${themeColor}-${primaryColorLevel}`,
        weekend && !disabled && "date-picker-cell-weekend",
        outOfMonth && !disabled && "date-picker-other-month",
        outOfMonth && hideOutOfMonthDates && "d-none",
        !outOfMonth &&
          !disabled &&
          !selected &&
          "date-picker-cell-current-month",
        !disabled && !selected && !inRange && "date-picker-cell-hoverable",
        selected &&
          !disabled &&
          `bg-${themeColor}-${primaryColorLevel} text-gray-100`,
        inRange &&
          !disabled &&
          !firstInRange &&
          !lastInRange &&
          !selected &&
          `bg-${themeColor}-${primaryColorLevel} bg-opacity-10`,
        !inRange && !firstInRange && !lastInRange && "rounded-lg",
        firstInRange &&
          !disabled &&
          "ltr:rounded-tl-lg ltr:rounded-bl-lg rtl:rounded-tr-lg rtl:rounded-br-lg",
        lastInRange &&
          !disabled &&
          "ltr:rounded-tr-lg ltr:rounded-br-lg rtl:rounded-tl-lg rtl:rounded-bl-lg",
        className
      )}
    >
      {typeof renderDay === "function"
        ? value && renderDay(value)
        : dayjs(value).toDate().getDate()}
    </button>
  );
});

export default Day;
