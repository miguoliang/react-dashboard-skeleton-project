import React from "react";
import classNames from "classnames";
import Header from "./Header";
import { useConfig } from "../../ConfigProvider";
import { formatYear, getMonthsNames, isMonthInRange } from "../utils";
import dayjs from "dayjs";

type MonthTableProps = {
  className?: string;
  value: {
    month: number;
    year: number;
  };
  onChange: (month: number) => void;
  locale: string;
  year: number;
  onYearChange: (year: number) => void;
  onNextLevel: () => void;
  minDate?: dayjs.ConfigType;
  maxDate?: dayjs.ConfigType;
  preventFocus?: boolean;
  monthLabelFormat?: string;
  yearLabelFormat?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const MonthTable = (props: MonthTableProps) => {
  const {
    className,
    value,
    onChange,
    locale,
    year,
    onYearChange,
    onNextLevel,
    minDate,
    maxDate,
    preventFocus,
    monthLabelFormat = "MMM",
    yearLabelFormat = "YYYY",
    ...rest
  } = props;

  const { themeColor, primaryColorLevel } = useConfig();

  const range = getMonthsNames(locale, monthLabelFormat);
  const minYear = minDate instanceof Date ? minDate.getFullYear() : undefined;
  const maxYear = maxDate instanceof Date ? maxDate.getFullYear() : undefined;

  const months = range.map((month, index) => {
    const disabled = !isMonthInRange({
      date: new Date(year, index),
      minDate,
      maxDate,
    });

    const active = index === value.month && year === value.year;

    return (
      <button
        key={month}
        onClick={() => onChange(index)}
        className={classNames(
          "year-picker-cell",
          active &&
            !disabled &&
            `bg-${themeColor}-${primaryColorLevel} text-white month-picker-cell-active`,
          !active && !disabled && "hover:bg-gray-100",
          disabled && "month-picker-cell-disabled",
        )}
        disabled={disabled}
        onMouseDown={(event) => preventFocus && event.preventDefault()}
      >
        {month}
      </button>
    );
  });

  return (
    <div className={classNames("month-picker", className)} {...rest}>
      <Header
        label={formatYear(year, yearLabelFormat)}
        hasNext={typeof maxYear === "number" ? year < maxYear : true}
        hasPrevious={typeof minYear === "number" ? year > minYear : true}
        onNext={() => onYearChange(year + 1)}
        onPrevious={() => onYearChange(year - 1)}
        onNextLevel={onNextLevel}
        className={className}
        nextLabel={"Next year"}
        previousLabel={"Previous year"}
        preventFocus={preventFocus}
      />
      <div className="month-table">{months}</div>
    </div>
  );
};

export default MonthTable;
