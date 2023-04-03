import React, { useState } from "react";
import { Calendar } from "components/ui";
import dayjs from "dayjs";

const DisabledCertainDate = () => {
  const [value, setValue] = useState<dayjs.ConfigType | dayjs.ConfigType[]>();

  const disableCertainDate = (date: dayjs.ConfigType) => {
    const banDate = [7, 15, 21];
    return banDate.includes(dayjs(date).toDate().getDate());
  };

  return (
    <div className="md:w-[260px] max-w-[260px] mx-auto">
      <Calendar
        value={value}
        onChange={setValue}
        disableDate={disableCertainDate}
      />
    </div>
  );
};

export default DisabledCertainDate;
