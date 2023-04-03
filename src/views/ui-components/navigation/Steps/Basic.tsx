import React from "react";
import { StepItem, Steps } from "components/ui";

const Basic = () => {
  return (
    <div>
      <Steps current={1}>
        <StepItem />
        <StepItem />
        <StepItem />
        <StepItem />
      </Steps>
    </div>
  );
};

export default Basic;
