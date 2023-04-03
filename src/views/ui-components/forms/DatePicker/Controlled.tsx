import React, { useState } from "react";
import DatePicker, {
  DatePickerRange,
  DateTimepicker,
} from "components/ui/DatePicker";
import dayjs from "dayjs";

const Controlled = () => {
  const [date, setDate] = useState<dayjs.ConfigType>(new Date());
  const [dateRange, setDateRange] = useState<
    [dayjs.ConfigType, dayjs.ConfigType]
  >([new Date(2022, 11, 1), new Date(2022, 11, 5)]);
  const [dateTime, setDateTime] = useState<dayjs.ConfigType>(new Date());

  const handleDatePickerChange = (date: dayjs.ConfigType) => {
    console.log("Selected date", date);
    setDate(date);
  };

  const handleRangePickerChange = (
    date: [dayjs.ConfigType, dayjs.ConfigType]
  ) => {
    console.log("Selected range date", date);
    setDateRange(date);
  };

  const handleDateTimeChange = (val: dayjs.ConfigType) => {
    console.log("Selected date time: ", val);
    setDateTime(val);
  };

  return (
    <div className="flex flex-col gap-5">
      <DatePicker
        placeholder="Pick a date"
        value={date}
        onChange={handleDatePickerChange}
      />
      <DatePickerRange
        placeholder="Select dates range"
        value={dateRange}
        onChange={handleRangePickerChange}
      />
      <DateTimepicker
        placeholder="Pick date & time"
        value={dateTime}
        onChange={handleDateTimeChange}
      />
    </div>
  );
};

export default Controlled;
