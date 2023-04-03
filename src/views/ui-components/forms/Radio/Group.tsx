import React, { useState } from "react";
import { Radio, RadioGroup } from "components/ui";

const Group = () => {
  const [value, setValue] = useState("Banana");

  const onChange = (val: string) => {
    setValue(val);
  };

  return (
    <div>
      <RadioGroup value={value} onChange={onChange}>
        <Radio value={"Apple"}>Apple</Radio>
        <Radio value={"Banana"}>Banana</Radio>
        <Radio value={"Cherry"}>Cherry</Radio>
      </RadioGroup>
    </div>
  );
};

export default Group;
