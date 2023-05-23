import { isSameDate } from "../../../utils";
import isWeekend from "./isWeekend";
import isOutside from "./isOutside";
import isDisabled from "./isDisabled";
import getRangeProps from "./getRangeProps";
import dayjs from "dayjs";

export type DayProps = {
  disabled: boolean;
  selected: boolean;
  weekend: boolean;
  outOfMonth: boolean;
  firstInRange: boolean;
  lastInRange: boolean;
  inRange: boolean;
  selectedInRange: boolean;
};

export default function getDayProps(props: {
  date: dayjs.ConfigType;
  month: dayjs.ConfigType;
  hasValue: boolean;
  minDate?: dayjs.ConfigType;
  maxDate?: dayjs.ConfigType;
  value?: dayjs.ConfigType | dayjs.ConfigType[];
  disableDate?: (date: dayjs.ConfigType) => boolean;
  disableOutOfMonth?: boolean;
  range?: [dayjs.ConfigType, dayjs.ConfigType];
  weekendDays?: number[];
  selected?: boolean;
}): DayProps {
  const {
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
  } = props;

  const outOfMonth = isOutside(dayjs(date).toDate(), dayjs(month).toDate());
  const selected =
    hasValue &&
    (Array.isArray(value)
      ? value.some((val) =>
          isSameDate(dayjs(val).toDate(), dayjs(date).toDate()),
        )
      : isSameDate(dayjs(date).toDate(), dayjs(value).toDate()));
  const { inRange, lastInRange, firstInRange, selectedInRange } = getRangeProps(
    date,
    range || [null, null],
  );

  return {
    disabled: isDisabled({
      minDate,
      maxDate,
      disableDate,
      disableOutOfMonth,
      date,
      outOfMonth,
    }),
    weekend: isWeekend(dayjs(date).toDate(), weekendDays),
    selectedInRange,
    selected,
    inRange,
    firstInRange,
    lastInRange,
    outOfMonth,
  };
}
