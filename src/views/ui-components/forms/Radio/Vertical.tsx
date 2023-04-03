import React, { useState } from "react";
import { Radio, RadioGroup } from "components/ui";

const Vertical = () => {
  const [value, setValue] = useState("Banana");

  const onChange = (val: string) => {
    setValue(val);
  };

  return (
    <div>
      <div className="mt-4">
        <RadioGroup vertical value={value} onChange={onChange}>
          <Radio value={"Apple"}>Apple</Radio>
          <Radio value={"Banana"}>Banana</Radio>
          <Radio value={"Cherry"}>Cherry</Radio>
        </RadioGroup>
      </div>
    </div>
  );
};

export default Vertical;
