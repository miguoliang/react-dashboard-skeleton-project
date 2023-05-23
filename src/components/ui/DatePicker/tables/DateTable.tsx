import React from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { isMonthInRange } from "../utils/isMonthInRange";
import Header from "./Header";
import Month from "./components/Month";
import capitalize from "../../utils/capitalize";
import { useConfig } from "../../ConfigProvider";

function formatMonthLabel({
  month,
  locale = "en",
  format,
}: {
  month: dayjs.ConfigType;
  locale?: string;
  format: string;
}) {
  return capitalize(dayjs(month).locale(locale).format(format));
}

type DateTableProps = {
  onNextLevel: (level: "date" | "month" | "year") => void;
  daysRefs: React.MutableRefObject<(HTMLButtonElement | null)[][][]>;
  dateViewCount: number;
  onDayKeyDown: (
    monthIndex: number,
    payload: {
      rowIndex: number;
      cellIndex: number;
      date: dayjs.ConfigType;
    },
    event: React.KeyboardEvent,
  ) => void;
  onMonthChange?: (date: dayjs.ConfigType) => void;
  enableHeaderLabel?: boolean;
  labelFormat?: {
    month?: string;
    year?: string;
  };
  weekdayLabelFormat?: string;
  preventFocus?: boolean;
  renderDay?: (date: dayjs.ConfigType) => React.ReactNode;
  paginateBy?: number;
  style?: React.CSSProperties;
} & Omit<
  React.ComponentProps<typeof Month>,
  "daysRefs" | "onNextLevel" | "onDayKeyDown"
>;

const DateTable = (props: DateTableProps) => {
  const {
    dateViewCount,
    paginateBy = 1,
    month,
    locale,
    minDate,
    maxDate,
    enableHeaderLabel,
    daysRefs,
    onMonthChange,
    onNextLevel,
    onDayKeyDown,
    className,
    labelFormat,
    weekdayLabelFormat,
    preventFocus,
    renderDay,
    ...rest
  } = props;

  const nextMonth = dayjs(month).add(dateViewCount, "months").toDate();
  const previousMonth = dayjs(month).subtract(1, "months").toDate();

  const { themeColor, primaryColorLevel } = useConfig();

  const pickerHeaderLabelClass = `picker-header-label hover:text-${themeColor}-${primaryColorLevel}`;

  const months = Array(dateViewCount)
    .fill(0)
    .map((_, index) => {
      const monthDate = dayjs(month).add(index, "months").toDate();
      return (
        <div className="day-picker" key={index}>
          <Header
            hasNext={
              index + 1 === dateViewCount &&
              isMonthInRange({
                date: nextMonth,
                minDate,
                maxDate,
              })
            }
            hasPrevious={
              index === 0 &&
              isMonthInRange({
                date: previousMonth,
                minDate,
                maxDate,
              })
            }
            onNext={() =>
              onMonthChange?.(dayjs(month).add(paginateBy, "months").toDate())
            }
            onPrevious={() =>
              onMonthChange?.(
                dayjs(month).subtract(paginateBy, "months").toDate(),
              )
            }
            className={className}
            renderCenter={dateViewCount > 1}
          >
            <div>
              <button
                className={classNames(pickerHeaderLabelClass)}
                disabled={!enableHeaderLabel}
                onClick={() => onNextLevel("month")}
                tabIndex={index > 0 ? -1 : 0}
                onMouseDown={(event) => preventFocus && event.preventDefault()}
              >
                {formatMonthLabel({
                  month: monthDate,
                  locale,
                  format: labelFormat?.month || "MMM",
                })}
              </button>
              <button
                className={classNames(pickerHeaderLabelClass)}
                disabled={!enableHeaderLabel}
                onClick={() => onNextLevel("year")}
                tabIndex={index > 0 ? -1 : 0}
                onMouseDown={(event) => preventFocus && event.preventDefault()}
              >
                {formatMonthLabel({
                  month: monthDate,
                  locale,
                  format: labelFormat?.year || "YYYY",
                })}
              </button>
            </div>
          </Header>
          <Month
            month={monthDate}
            daysRefs={daysRefs.current[index]}
            onDayKeyDown={(...args) => onDayKeyDown(index, ...args)}
            minDate={minDate}
            maxDate={maxDate}
            className={className}
            locale={locale}
            focusable={index === 0}
            preventFocus={preventFocus}
            renderDay={renderDay}
            weekdayLabelFormat={weekdayLabelFormat}
            {...rest}
          />
        </div>
      );
    });

  return <>{months}</>;
};

export default DateTable;
