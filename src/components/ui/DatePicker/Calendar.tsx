import dayjs from "dayjs";
import React from "react";
import CalendarBase, { CalendarBaseProps } from "./CalendarBase";

type CalendarProps = Omit<CalendarBaseProps, "value" | "onChange"> & {
  onChange: (value: dayjs.ConfigType | dayjs.ConfigType[]) => void;
  value: dayjs.ConfigType | dayjs.ConfigType[];
  inputLabel?: string;
};

const Calendar = (props: CalendarProps) => {
  const { value, onChange, ...rest } = props;

  const handleChange = (date: dayjs.ConfigType | dayjs.ConfigType[]) => {
    return onChange(date);
  };

  return <CalendarBase onChange={handleChange} value={value} {...rest} />;
};

export default Calendar;
