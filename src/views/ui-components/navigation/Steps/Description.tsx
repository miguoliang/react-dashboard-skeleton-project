import React from "react";
import { StepItem, Steps } from "components/ui";

const Description = () => {
  return (
    <div className="mb-6">
      <Steps current={2} vertical>
        <StepItem title="Login" description="Login to your account" />
        <StepItem title="Place Order" description="Start placing an order" />
        <StepItem title="In Review" description="We will review the order" />
        <StepItem title="Approved" description="Order approved" />
      </Steps>
    </div>
  );
};

export default Description;
