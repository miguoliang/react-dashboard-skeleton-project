import React, { useState } from "react";
import { Calendar } from "components/ui";
import dayjs from "dayjs";

const Basic = () => {
  const [value, setValue] = useState<dayjs.ConfigType | dayjs.ConfigType[]>();

  return (
    <div className="md:w-[260px] max-w-[260px] mx-auto">
      <Calendar value={value} onChange={setValue} />
    </div>
  );
};

export default Basic;
