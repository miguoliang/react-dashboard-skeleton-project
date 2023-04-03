import React, { useState } from "react";
import { Calendar } from "components/ui";
import dayjs from "dayjs";

const MultipleSelection = () => {
  const [value, setValue] = useState<dayjs.ConfigType[]>([]);

  return (
    <div className="md:w-[260px] max-w-[260px] mx-auto">
      <Calendar
        value={value}
        onChange={(date) => setValue(date as dayjs.ConfigType[])}
      />
    </div>
  );
};

export default MultipleSelection;
