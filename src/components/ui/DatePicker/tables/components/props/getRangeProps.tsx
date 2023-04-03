import dayjs from "dayjs";
import { isSameDate } from "../../../utils";

export default function getRangeProps(
  date: dayjs.ConfigType,
  range: [dayjs.ConfigType, dayjs.ConfigType]
) {
  const hasRange =
    Array.isArray(range) && range.every((val) => val instanceof Date);
  const inclusiveRange = hasRange && [
    dayjs(range[0]).subtract(1, "day"),
    dayjs(range[1]).add(1, "day"),
  ];

  const firstInRange =
    hasRange && isSameDate(dayjs(date).toDate(), dayjs(range[0]).toDate());
  const lastInRange =
    hasRange && isSameDate(dayjs(date).toDate(), dayjs(range[1]).toDate());
  const inRange =
    Array.isArray(inclusiveRange) &&
    dayjs(date).isAfter(inclusiveRange[0], "day") &&
    dayjs(date).isBefore(inclusiveRange[1], "day");

  return {
    firstInRange,
    lastInRange,
    inRange,
    selectedInRange: firstInRange || lastInRange,
  };
}
