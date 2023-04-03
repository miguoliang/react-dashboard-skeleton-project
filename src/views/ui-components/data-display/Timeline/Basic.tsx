import React from "react";
import { TimeLine, TimeLineItem } from "components/ui";

const Basic = () => {
  return (
    <div>
      <TimeLine>
        <TimeLineItem>Breakfast - 09:00</TimeLineItem>
        <TimeLineItem>Lunch - 12:30</TimeLineItem>
        <TimeLineItem>Dinner - 7:00</TimeLineItem>
      </TimeLine>
    </div>
  );
};

export default Basic;
