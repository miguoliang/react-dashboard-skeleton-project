import React, { useState } from "react";
import { Calendar } from "components/ui";
import dayjs from "dayjs";

const MultipleDateView = () => {
  const [value, setValue] = useState<dayjs.ConfigType | dayjs.ConfigType[]>();

  return (
    <div className="overflow-x-auto ">
      <div className="w-[520px] mx-auto">
        <Calendar value={value} onChange={setValue} dateViewCount={2} />
      </div>
    </div>
  );
};

export default MultipleDateView;
