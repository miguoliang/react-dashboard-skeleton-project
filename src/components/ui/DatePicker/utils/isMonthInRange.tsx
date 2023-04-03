import dayjs from "dayjs";

export function isMonthInRange({
  date,
  minDate,
  maxDate,
}: {
  date: dayjs.ConfigType;
  minDate: dayjs.ConfigType;
  maxDate: dayjs.ConfigType;
}) {
  const hasMinDate = minDate instanceof Date;
  const hasMaxDate = maxDate instanceof Date;

  if (!hasMaxDate && !hasMinDate) {
    return true;
  }

  const endOfMonth = dayjs(date).endOf("month");
  const startOfMonth = dayjs(date).startOf("month");
  const maxInRange = hasMaxDate ? startOfMonth.isBefore(maxDate) : true;
  const minInRange = hasMinDate ? endOfMonth.isAfter(minDate) : true;
  return maxInRange && minInRange;
}
