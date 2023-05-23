import React, { forwardRef, MouseEventHandler, useState } from "react";
import dayjs from "dayjs";
import { isSameDate } from "./utils/isSameDate";
import CalendarBase, { DateRange } from "./CalendarBase";

type RangeCalendarProps = {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
} & Omit<React.ComponentProps<typeof CalendarBase>, "value" | "onChange">;

const RangeCalendar = forwardRef<HTMLDivElement, RangeCalendarProps>(
  (props, ref) => {
    const {
      value = [null, null],
      onChange,
      dayStyle,
      onMouseLeave,
      dateViewCount = 1,
      paginateBy,
      ...rest
    } = props;

    const [hoveredDay, setHoveredDay] = useState<dayjs.ConfigType>(null);
    const [pickedDate, setPickedDate] = useState<dayjs.ConfigType>(null);

    const setRangeDate = (date: dayjs.ConfigType): void => {
      if (pickedDate instanceof Date) {
        if (isSameDate(dayjs(date).toDate(), pickedDate)) {
          setPickedDate(null);
          setHoveredDay(null);
          return;
        }

        const result = [dayjs(date).toDate(), pickedDate];
        result.sort((a, b) => a.getTime() - b.getTime());
        onChange?.([result[0], result[1]]);
        setPickedDate(null);
        return;
      }

      if (
        value[0] &&
        isSameDate(dayjs(date).toDate(), dayjs(value[0]).toDate())
      ) {
        setPickedDate(null);
        setHoveredDay(null);
        onChange?.([null, null]);
        return;
      }

      onChange?.([date, null]);
      setPickedDate(date);
    };

    const handleMouseLeave: MouseEventHandler<HTMLDivElement> = (event) => {
      typeof onMouseLeave === "function" && onMouseLeave(event);
      setHoveredDay(null);
    };

    const shouldHighlightDate = (
      date: dayjs.ConfigType,
      modifiers?: Record<string, boolean>,
    ) => {
      if (pickedDate instanceof Date && hoveredDay instanceof Date) {
        const result = [hoveredDay, pickedDate];
        result.sort((a, b) => a.getTime() - b.getTime());
        return (
          !modifiers?.selected &&
          dayjs(date).subtract(1, "day").isBefore(result[1]) &&
          dayjs(date).add(1, "day").isAfter(result[0])
        );
      }

      return false;
    };

    const isPickedDateFirstInRange = (
      date: dayjs.ConfigType,
      modifiers?: Record<string, boolean>,
    ) => {
      if (pickedDate instanceof Date && hoveredDay instanceof Date) {
        const result = [hoveredDay, pickedDate];
        result.sort((a, b) => a.getTime() - b.getTime());
        return !!modifiers?.selected && dayjs(date).isBefore(result[1]);
      }

      return false;
    };

    const isPickedDateLastInRange = (
      date: dayjs.ConfigType,
      modifiers?: Record<string, boolean>,
    ) => {
      if (pickedDate instanceof Date && hoveredDay instanceof Date) {
        const result = [hoveredDay, pickedDate];
        result.sort((a, b) => a.getTime() - b.getTime());
        return !!modifiers?.selected && dayjs(date).isAfter(result[0]);
      }

      return false;
    };

    return (
      <CalendarBase
        ref={ref}
        dayStyle={dayStyle}
        onMouseLeave={handleMouseLeave}
        onDayMouseEnter={(date) => setHoveredDay(date)}
        onChange={(date) => setRangeDate(date as dayjs.ConfigType)}
        value={pickedDate ? [pickedDate, hoveredDay] : value}
        range={value}
        dateViewCount={dateViewCount}
        paginateBy={paginateBy || dateViewCount}
        hideOutOfMonthDates={dateViewCount > 1}
        isDateInRange={shouldHighlightDate}
        isDateFirstInRange={isPickedDateFirstInRange}
        isDateLastInRange={isPickedDateLastInRange}
        {...rest}
      />
    );
  },
);

RangeCalendar.defaultProps = {
  dateViewCount: 1,
};

export default RangeCalendar;
