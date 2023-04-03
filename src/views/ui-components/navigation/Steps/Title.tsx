import React from "react";
import { StepItem, Steps } from "components/ui";

const Title = () => {
  return (
    <div>
      <Steps current={1}>
        <StepItem title="Login" />
        <StepItem title="Order Placed" />
        <StepItem title="In Review" />
        <StepItem title="Approved" />
      </Steps>
    </div>
  );
};

export default Title;
