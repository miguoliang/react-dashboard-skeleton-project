import React from "react";
import { StepItem, Steps } from "components/ui";

const Error = () => {
  return (
    <div>
      <Steps current={1} status="error">
        <StepItem title="Login" />
        <StepItem title="Order Placed" />
        <StepItem title="In Review" />
        <StepItem title="Approved" />
      </Steps>
    </div>
  );
};

export default Error;
