import React, { useState } from "react";
import { StepItem, Steps } from "components/ui";

const Clickable = () => {
  const [step, setStep] = useState(1);

  const onStepChange = (index: number) => {
    setStep(index);
  };

  return (
    <div>
      <Steps current={step} onChange={(index) => onStepChange(index)}>
        <StepItem title="Login" />
        <StepItem title="Order Placed" />
        <StepItem title="In Review" />
        <StepItem title="Approved" />
      </Steps>
    </div>
  );
};

export default Clickable;
