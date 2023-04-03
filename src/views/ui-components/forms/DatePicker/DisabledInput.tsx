import DatePicker from "components/ui/DatePicker";
import React, { useState } from "react";

const DisabledInput = () => {
  const [date] = useState(new Date());

  return (
    <div>
      <DatePicker className="mb-4" placeholder="Select a date" disabled />
      <DatePicker className="mb-4" value={date} disabled />
    </div>
  );
};

export default DisabledInput;
