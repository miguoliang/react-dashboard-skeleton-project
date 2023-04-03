import React, { useState } from "react";
import { TimeInput, TimeInputRange } from "components/ui";
import dayjs from "dayjs";

const Controlled = () => {
  const [timeValue, setTimeValue] = useState<Date | null>(new Date());

  const [timeRangeValue, setTimeRangeValue] = useState([
    new Date(),
    dayjs(new Date()).add(60, "minutes").toDate(),
  ]);

  return (
    <div className="flex flex-col gap-5">
      <TimeInput value={timeValue} onChange={setTimeValue} />
      <TimeInputRange value={timeRangeValue} onChange={setTimeRangeValue} />
    </div>
  );
};

export default Controlled;
