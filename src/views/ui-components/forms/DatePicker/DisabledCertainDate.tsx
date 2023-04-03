import React, { useState } from "react";
import DatePicker from "components/ui/DatePicker";
import dayjs from "dayjs";

const DisabledCertainDate = () => {
  const [dateValue, setDateValue] = useState(new Date());

  const onCertainPeriodChange = (date: dayjs.ConfigType) => {
    setDateValue(dayjs(date).toDate());
  };

  const disableCertainDate = (date: dayjs.ConfigType) => {
    const banDate = [7, 15, 21];
    return banDate.includes(dayjs(date).toDate().getDate());
  };

  return (
    <DatePicker
      value={dateValue}
      placeholder="Pick your date"
      onChange={onCertainPeriodChange}
      disableDate={disableCertainDate}
    />
  );
};

export default DisabledCertainDate;
