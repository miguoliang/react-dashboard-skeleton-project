import React, { forwardRef, useRef, useState } from "react";
import classNames from "classnames";
import useControllableState from "../hooks/useControllableState";
import { useConfig } from "../ConfigProvider";
import DateTable from "./tables/DateTable";
import MonthTable from "./tables/MonthTable";
import YearTable from "./tables/YearTable";
import { CustomRefElementProps } from "../utils/constant";
import dayjs from "dayjs";
import { DayProps } from "./tables/components/props/getDayProps";

export type DateRange = [dayjs.ConfigType, dayjs.ConfigType];

export type CalendarBaseProps = CustomRefElementProps<
  {
    dateViewCount?: number;
    dayClassName?: string | ((date: dayjs.ConfigType, v: DayProps) => string);
    dayStyle?:
      | React.CSSProperties
      | ((date: dayjs.ConfigType, v: DayProps) => React.CSSProperties);
    defaultMonth?: dayjs.ConfigType;
    defaultView?: "date" | "month" | "year";
    disableDate?: (date: dayjs.ConfigType) => boolean;
    disableOutOfMonth?: boolean;
    enableHeaderLabel?: boolean;
    firstDayOfWeek?:
      | "monday"
      | "tuesday"
      | "wednesday"
      | "thursday"
      | "friday"
      | "saturday"
      | "sunday";
    hideOutOfMonthDates?: boolean;
    hideWeekdays?: boolean;
    isDateFirstInRange?: (date: dayjs.ConfigType) => boolean;
    isDateInRange?: (date: dayjs.ConfigType) => boolean;
    isDateLastInRange?: (date: dayjs.ConfigType) => boolean;
    labelFormat?: {
      month?: string;
      year?: string;
    };
    locale?: string;
    maxDate?: dayjs.ConfigType;
    minDate?: dayjs.ConfigType;
    month?: dayjs.ConfigType;
    monthLabelFormat?: string;
    onChange?: (date: dayjs.ConfigType | dayjs.ConfigType[]) => void;
    onDayMouseEnter?: (date: dayjs.ConfigType) => void;
    onMonthChange?: (date: dayjs.ConfigType) => void;
    paginateBy?: number;
    preventFocus?: boolean;
    range?: DateRange;
    renderDay?: (date: dayjs.ConfigType) => React.ReactNode;
    value?: dayjs.ConfigType | dayjs.ConfigType[];
    weekdayLabelFormat?: string;
    weekendDays?: number[];
    yearLabelFormat?: string;
  },
  "div"
>;

const CalendarBase = forwardRef<HTMLDivElement, CalendarBaseProps>(
  (props, ref) => {
    const {
      className,
      dateViewCount = 1,
      dayClassName,
      dayStyle,
      defaultMonth,
      defaultView = "date",
      disableDate,
      disableOutOfMonth,
      enableHeaderLabel = true,
      firstDayOfWeek = "monday",
      hideOutOfMonthDates,
      hideWeekdays,
      isDateFirstInRange,
      isDateInRange,
      isDateLastInRange,
      labelFormat = {
        month: "MMM",
        year: "YYYY",
      },
      locale,
      maxDate,
      minDate,
      month,
      monthLabelFormat = "MMM",
      onChange,
      onDayMouseEnter,
      onMonthChange,
      paginateBy = dateViewCount,
      preventFocus,
      range = [undefined, undefined],
      renderDay,
      style,
      value,
      weekdayLabelFormat = "dd",
      weekendDays,
      yearLabelFormat = "YYYY",
      ...rest
    } = props;

    const { locale: themeLocale } = useConfig();

    const [selectionState, setSelectionState] =
      useState<CalendarBaseProps["defaultView"]>(defaultView);

    const finalLocale = locale || themeLocale;

    const daysRefs = useRef<(HTMLButtonElement | null)[][][]>([]);

    const [_month, setMonth] = useControllableState({
      prop: month,
      defaultProp: defaultMonth !== undefined ? defaultMonth : new Date(),
      onChange: onMonthChange,
    });

    const [yearSelection, setYearSelection] = useState(_month.getFullYear());
    const [monthSelection, setMonthSelection] = useState(_month.getMonth());

    const minYear = minDate instanceof Date ? minDate.getFullYear() : 100;
    const maxYear = maxDate instanceof Date ? maxDate.getFullYear() : 10000;

    const daysPerRow = 6;

    const focusOnNextFocusableDay = (
      direction: "down" | "up" | "right" | "left",
      monthIndex: number,
      payload: any,
      n = 1
    ) => {
      const changeRow = ["down", "up"].includes(direction);

      const rowIndex = changeRow
        ? payload.rowIndex + (direction === "down" ? n : -n)
        : payload.rowIndex;

      const cellIndex = changeRow
        ? payload.cellIndex
        : payload.cellIndex + (direction === "right" ? n : -n);

      const dayToFocus = daysRefs.current[monthIndex][rowIndex][cellIndex];

      if (!dayToFocus) {
        return;
      }

      if (dayToFocus.disabled) {
        focusOnNextFocusableDay(direction, monthIndex, payload, n + 1);
      } else {
        dayToFocus.focus();
      }
    };

    const handleDayKeyDown = (
      monthIndex: number,
      payload: {
        rowIndex: number;
        cellIndex: number;
        date: dayjs.ConfigType;
      },
      event: React.KeyboardEvent
    ) => {
      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();

          const hasRowBelow =
            payload.rowIndex + 1 < daysRefs.current[monthIndex].length;
          if (hasRowBelow) {
            focusOnNextFocusableDay("down", monthIndex, payload);
          }
          break;
        }
        case "ArrowUp": {
          event.preventDefault();

          const hasRowAbove = payload.rowIndex > 0;
          if (hasRowAbove) {
            focusOnNextFocusableDay("up", monthIndex, payload);
          }
          break;
        }
        case "ArrowRight": {
          event.preventDefault();

          const isNotLastCell = payload.cellIndex !== daysPerRow;
          if (isNotLastCell) {
            focusOnNextFocusableDay("right", monthIndex, payload);
          } else if (monthIndex + 1 < dateViewCount) {
            if (daysRefs.current[monthIndex + 1][payload.rowIndex]) {
              daysRefs.current[monthIndex + 1][payload.rowIndex][0]?.focus();
            }
          }
          break;
        }
        case "ArrowLeft": {
          event.preventDefault();

          if (payload.cellIndex !== 0) {
            focusOnNextFocusableDay("left", monthIndex, payload);
          } else if (monthIndex > 0) {
            if (daysRefs.current[monthIndex - 1][payload.rowIndex]) {
              daysRefs.current[monthIndex - 1][payload.rowIndex][
                daysPerRow
              ]?.focus();
            }
          }
          break;
        }
        default:
          break;
      }
    };

    return (
      <div className={classNames("picker-view", className)} ref={ref} {...rest}>
        {selectionState === "year" && (
          <YearTable
            value={yearSelection}
            minYear={minYear}
            maxYear={maxYear}
            onChange={(year: number) => {
              setMonth(new Date(year, monthSelection, 1));
              setYearSelection(year);
              setSelectionState("date");
            }}
            className={className}
            preventFocus={preventFocus}
            yearLabelFormat={yearLabelFormat}
          />
        )}
        {selectionState === "month" && (
          <MonthTable
            value={{
              month: _month.getMonth(),
              year: _month.getFullYear(),
            }}
            year={yearSelection}
            onYearChange={setYearSelection}
            onNextLevel={() => setSelectionState("year")}
            locale={finalLocale}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(monthValue: number) => {
              setMonth(new Date(yearSelection, monthValue, 1));
              setMonthSelection(monthValue);
              setSelectionState("date");
            }}
            className={className}
            style={style}
            preventFocus={preventFocus}
            yearLabelFormat={yearLabelFormat}
            monthLabelFormat={monthLabelFormat}
          />
        )}
        {selectionState === "date" && (
          <DateTable
            dateViewCount={dateViewCount}
            paginateBy={paginateBy}
            month={_month}
            locale={finalLocale}
            minDate={minDate}
            maxDate={maxDate}
            enableHeaderLabel={enableHeaderLabel}
            daysRefs={daysRefs}
            onMonthChange={setMonth}
            onNextLevel={(view: CalendarBaseProps["defaultView"]) =>
              setSelectionState(view)
            }
            onDayKeyDown={handleDayKeyDown}
            style={style}
            dayClassName={dayClassName}
            dayStyle={dayStyle}
            disableOutOfMonth={disableOutOfMonth}
            disableDate={disableDate}
            hideWeekdays={hideWeekdays}
            preventFocus={preventFocus}
            firstDayOfWeek={firstDayOfWeek}
            value={value}
            range={range}
            onChange={onChange}
            labelFormat={labelFormat}
            weekdayLabelFormat={weekdayLabelFormat}
            onDayMouseEnter={onDayMouseEnter}
            renderDay={renderDay}
            hideOutOfMonthDates={hideOutOfMonthDates}
            isDateInRange={isDateInRange}
            isDateFirstInRange={isDateFirstInRange}
            isDateLastInRange={isDateLastInRange}
            weekendDays={weekendDays}
          />
        )}
      </div>
    );
  }
);

export default CalendarBase;
