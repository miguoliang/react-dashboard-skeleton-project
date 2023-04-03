import dayjs from "dayjs";

type isDisabledProps = Partial<{
  minDate: dayjs.ConfigType;
  maxDate: dayjs.ConfigType;
  disableDate: (date: dayjs.ConfigType) => boolean;
  disableOutOfMonth: boolean;
  date: dayjs.ConfigType;
  outOfMonth: boolean;
}>;

export default function isDisabled({
  minDate,
  maxDate,
  disableDate,
  disableOutOfMonth,
  date,
  outOfMonth,
}: isDisabledProps): boolean {
  const isAfterMax =
    maxDate instanceof Date && dayjs(maxDate).isBefore(date, "day");
  const isBeforeMin =
    minDate instanceof Date && dayjs(minDate).isAfter(date, "day");
  const shouldExclude =
    typeof disableDate === "function" && date && disableDate(date);
  const disabledOutside = !!disableOutOfMonth && !!outOfMonth;
  return isAfterMax || isBeforeMin || shouldExclude || disabledOutside;
}
