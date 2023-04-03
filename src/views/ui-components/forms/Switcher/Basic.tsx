import React, { ChangeEvent } from "react";
import { Switcher } from "components/ui";

const Basic = () => {
  const onSwitcherToggle = (val: any, e: ChangeEvent<Element>) => {
    console.log(val, e);
  };

  return (
    <div>
      <Switcher defaultChecked onChange={onSwitcherToggle} />
    </div>
  );
};

export default Basic;
