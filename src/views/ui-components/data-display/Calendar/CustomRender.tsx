import React, { useState } from "react";
import { Badge, Calendar } from "components/ui";
import dayjs from "dayjs";

const CustomRender = () => {
  const [value, setValue] = useState<dayjs.ConfigType | dayjs.ConfigType[]>();

  return (
    <div className="md:w-[260px] max-w-[260px] mx-auto">
      <Calendar
        value={value}
        onChange={setValue}
        dayClassName={(date, { selected }) => {
          if (dayjs(date).toDate().getDate() === 12 && !selected) {
            return "text-red-600";
          }

          if (selected) {
            return "text-white";
          }

          return "text-gray-700 dark:text-gray-200";
        }}
        dayStyle={(date, { selected, outOfMonth }) => {
          if (dayjs(date).toDate().getDate() === 18 && !selected) {
            return { color: "#15c39a" };
          }

          if (outOfMonth) {
            return {
              opacity: 0,
              pointerEvents: "none",
              cursor: "default",
            };
          }

          return {};
        }}
        renderDay={(date) => {
          const day = dayjs(date).toDate().getDate();

          if (day !== 12) {
            return <span>{day}</span>;
          }

          return (
            <span className="relative flex justify-center items-center w-full h-full">
              {day}
              <Badge className="absolute bottom-1" innerClass="h-1 w-1" />
            </span>
          );
        }}
      />
    </div>
  );
};

export default CustomRender;
