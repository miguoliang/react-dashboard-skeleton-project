import React, { useState } from "react";
import classNames from "classnames";
import Header from "./Header";
import { formatYear, getDecadeRange } from "../utils";
import { useConfig } from "../../ConfigProvider";

type YearProps = {
  className?: string;
  value: number;
  onChange: (year: number) => void;
  locale?: string;
  minYear: number;
  maxYear: number;
  preventFocus?: boolean;
  yearLabelFormat?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const YearTable = (props: YearProps) => {
  const {
    className,
    value,
    onChange,
    minYear,
    maxYear,
    preventFocus,
    yearLabelFormat = "YYYY",
    ...rest
  } = props;

  const { themeColor, primaryColorLevel } = useConfig();

  const [decade, setDecade] = useState(value);
  const range = getDecadeRange(decade);

  const years = range.map((year) => {
    const disabled = year < minYear || year > maxYear;

    const active = year === value;

    return (
      <button
        key={year}
        onClick={() => onChange(year)}
        disabled={disabled}
        onMouseDown={(event) => preventFocus && event.preventDefault()}
        className={classNames(
          "year-picker-cell",
          active &&
            !disabled &&
            `bg-${themeColor}-${primaryColorLevel} text-white year-picker-cell-active`,
          !active && !disabled && "hover:bg-gray-100",
          disabled && "year-picker-cell-disabled",
        )}
      >
        {formatYear(year, yearLabelFormat)}
      </button>
    );
  });

  return (
    <div className={classNames("year-picker", className)} {...rest}>
      <Header
        label={`${formatYear(range[0], yearLabelFormat)} - ${formatYear(
          range[range.length - 1],
          yearLabelFormat,
        )}`}
        hasPrevious={typeof minYear === "number" ? minYear < range[0] : true}
        hasNext={
          typeof maxYear === "number" ? maxYear > range[range.length - 1] : true
        }
        onNext={() => setDecade((current) => current + 10)}
        onPrevious={() => setDecade((current) => current - 10)}
        nextLevelDisabled
        nextLabel={"Next decade"}
        previousLabel={"Previous decade"}
        preventFocus={preventFocus}
      />
      <div className="year-table">{years}</div>
    </div>
  );
};

export default YearTable;
