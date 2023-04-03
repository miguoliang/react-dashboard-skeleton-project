import React from "react";
import { TimeInputRange } from "components/ui";
import dayjs from "dayjs";

const TimeRangeInput = () => {
  return (
    <TimeInputRange
      defaultValue={[new Date(), dayjs(new Date()).add(60, "minutes").toDate()]}
      clearable
    />
  );
};

export default TimeRangeInput;
