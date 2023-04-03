import React from "react";
import { Checkbox } from "components/ui";
import { CheckboxEventHandler } from "../../../../components/ui/Checkbox/Checkbox";

const Default = () => {
  const onCheck: CheckboxEventHandler = (value, e) => {
    console.log(value, e);
  };

  return (
    <div>
      <Checkbox defaultChecked onChange={onCheck}>
        Checkbox
      </Checkbox>
    </div>
  );
};

export default Default;
