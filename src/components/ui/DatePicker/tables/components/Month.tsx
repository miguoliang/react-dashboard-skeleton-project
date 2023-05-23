import React, { forwardRef, useMemo } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import Day from "./Day";
import getDayProps, { DayProps } from "./props/getDayProps";
import { getMonthDays, getWeekdaysNames, isSameDate } from "../../utils";
import { useConfig } from "../../../ConfigProvider";
import { noop } from "components/ui/utils/constant";
import { DateRange } from "../../CalendarBase";

type MonthProps = {
  month: dayjs.ConfigType;
  value?: dayjs.ConfigType | dayjs.ConfigType[];
  onChange?: (date: dayjs.ConfigType) => void;
  disableOutOfMonth?: boolean;
  locale?: string;
  dayClassName?: string | ((date: dayjs.ConfigType, v: DayProps) => string);
  dayStyle?:
    | React.CSSProperties
    | ((date: dayjs.ConfigType, dayProps: DayProps) => React.CSSProperties);
  minDate?: dayjs.ConfigType;
  maxDate?: dayjs.ConfigType;
  disableDate?: (date: dayjs.ConfigType) => boolean;
  onDayMouseEnter?: (date: dayjs.ConfigType, event: React.MouseEvent) => void;
  range?: DateRange;
  hideWeekdays?: boolean;
  fullWidth?: boolean;
  preventFocus?: boolean;
  focusable?: boolean;
  firstDayOfWeek?:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  onDayKeyDown?: (
    date: { rowIndex: number; cellIndex: number; date: dayjs.ConfigType },
    event: React.KeyboardEvent,
  ) => void;
  daysRefs?: (HTMLButtonElement | null)[][];
  hideOutOfMonthDates?: boolean;
  isDateInRange?: (date: dayjs.ConfigType, dayProps: DayProps) => boolean;
  isDateFirstInRange?: (date: dayjs.ConfigType, dayProps: DayProps) => boolean;
  isDateLastInRange?: (date: dayjs.ConfigType, dayProps: DayProps) => boolean;
  renderDay?: (date: dayjs.ConfigType) => React.ReactNode;
  weekdayLabelFormat?: string;
  weekendDays?: number[];
  className?: string;
};

const Month = forwardRef<HTMLTableElement, MonthProps>((props, ref) => {
  const {
    className,
    month,
    value,
    onChange,
    disableOutOfMonth = false,
    locale,
    dayClassName,
    dayStyle,
    minDate,
    maxDate,
    disableDate,
    onDayMouseEnter,
    range,
    hideWeekdays = false,
    preventFocus = false,
    focusable = true,
    firstDayOfWeek = "monday",
    onDayKeyDown,
    daysRefs,
    hideOutOfMonthDates = false,
    isDateInRange = noop,
    isDateFirstInRange = noop,
    isDateLastInRange = noop,
    renderDay,
    weekdayLabelFormat,
    weekendDays = [0, 6],
    ...rest
  } = props;

  const { locale: themeLocale } = useConfig();

  const finalLocale = locale || themeLocale;
  const days = getMonthDays(dayjs(month).toDate(), firstDayOfWeek);

  const weekdays = getWeekdaysNames(
    finalLocale,
    firstDayOfWeek,
    weekdayLabelFormat,
  ).map((weekday) => (
    <th className="week-day-cell" key={weekday}>
      <span className="week-day-cell-content">{weekday}</span>
    </th>
  ));

  const hasValue = Array.isArray(value)
    ? value.every((item) => item instanceof Date)
    : value instanceof Date;

  const hasValueInMonthRange =
    value instanceof Date &&
    dayjs(value).isAfter(dayjs(month).startOf("month")) &&
    dayjs(value).isBefore(dayjs(month).endOf("month"));

  const firstIncludedDay = useMemo(
    () =>
      days
        .flatMap((_) => _)
        .find((date) => {
          const dayProps = getDayProps({
            date,
            month,
            hasValue,
            minDate,
            maxDate,
            value,
            disableDate,
            disableOutOfMonth,
            range,
            weekendDays,
          });

          return !dayProps.disabled && !dayProps.outOfMonth;
        }) || dayjs(month).startOf("month").toDate(),
    [],
  );

  const rows = days.map((row, rowIndex) => {
    const cells = row.map((date, cellIndex) => {
      const dayProps = getDayProps({
        date,
        month,
        hasValue,
        minDate,
        maxDate,
        value,
        disableDate,
        disableOutOfMonth,
        range,
        weekendDays,
      });

      const onKeyDownPayload = { rowIndex, cellIndex, date };

      return (
        <td className={classNames("date-picker-cell")} key={cellIndex}>
          <Day
            ref={(button) => {
              if (daysRefs) {
                if (!Array.isArray(daysRefs[rowIndex])) {
                  daysRefs[rowIndex] = [];
                }
                daysRefs[rowIndex][cellIndex] = button;
              }
            }}
            onClick={() => typeof onChange === "function" && onChange(date)}
            onMouseDown={(event) => preventFocus && event.preventDefault()}
            outOfMonth={dayProps.outOfMonth}
            weekend={dayProps.weekend}
            inRange={dayProps.inRange || isDateInRange(date, dayProps)}
            firstInRange={
              dayProps.firstInRange || isDateFirstInRange(date, dayProps)
            }
            lastInRange={
              dayProps.lastInRange || isDateLastInRange(date, dayProps)
            }
            firstInMonth={isSameDate(date, firstIncludedDay)}
            selected={dayProps.selected || dayProps.selectedInRange}
            hasValue={hasValueInMonthRange}
            onKeyDown={(event) =>
              typeof onDayKeyDown === "function" &&
              onDayKeyDown(onKeyDownPayload, event)
            }
            className={
              typeof dayClassName === "function"
                ? dayClassName(date, dayProps)
                : ""
            }
            style={
              typeof dayStyle === "function"
                ? dayStyle(date, dayProps)
                : undefined
            }
            disabled={dayProps.disabled}
            onMouseEnter={
              typeof onDayMouseEnter === "function" ? onDayMouseEnter : noop
            }
            focusable={focusable}
            hideOutOfMonthDates={hideOutOfMonthDates}
            renderDay={renderDay}
            isToday={isSameDate(date, new Date())}
            value={date}
          />
        </td>
      );
    });

    return (
      <tr className={classNames("date-picker-week-cell")} key={rowIndex}>
        {cells}
      </tr>
    );
  });

  return (
    <table
      className={classNames("picker-table", className)}
      ref={ref}
      cellSpacing="0"
      {...rest}
    >
      {!hideWeekdays && (
        <thead>
          <tr>{weekdays}</tr>
        </thead>
      )}
      <tbody>{rows}</tbody>
    </table>
  );
});

export default Month;
