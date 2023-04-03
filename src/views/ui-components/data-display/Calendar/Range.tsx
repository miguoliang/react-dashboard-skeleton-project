import React, { useState } from "react";
import { RangeCalendar } from "components/ui";
import dayjs from "dayjs";
import { DateRange } from "../../../../components/ui/DatePicker/CalendarBase";

const Range = () => {
  const [value, setValue] = useState<DateRange>([
    new Date(),
    dayjs(new Date()).add(5, "days").toDate(),
  ]);

  return (
    <div className="md:w-[260px] max-w-[260px] mx-auto">
      <RangeCalendar value={value} onChange={setValue} />
    </div>
  );
};

export default Range;
