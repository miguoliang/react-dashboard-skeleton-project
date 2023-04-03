import React, { useState } from "react";
import { Checkbox, CheckboxGroup } from "components/ui";
import { CheckboxGroupChangeEventHandler } from "../../../../components/ui/Checkbox/Group";

const Group = () => {
  const [checkboxList, setCheckboxList] = useState<any[]>(["Selection A"]);

  const onCheckboxChange: CheckboxGroupChangeEventHandler = (options, e) => {
    console.log("Checkbox change", options, e);
    setCheckboxList(options);
  };

  return (
    <div>
      <CheckboxGroup onChange={onCheckboxChange} value={checkboxList}>
        <Checkbox value="Selection A">Selection A </Checkbox>
        <Checkbox value="Selection B">Selection B </Checkbox>
        <Checkbox value="Selection C">Selection C </Checkbox>
      </CheckboxGroup>
    </div>
  );
};

export default Group;
