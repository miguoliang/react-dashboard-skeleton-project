import React from "react";
import { Menu } from "components/ui";
import { HiCheckCircle, HiLockClosed } from "react-icons/hi";
import useThemeClass from "utils/hooks/useThemeClass";
import { setCurrentStep } from "../store/stateSlice";
import { setStepStatus } from "../store/dataSlice";
import MenuItem from "components/ui/MenuItem";
import { useAppDispatch } from "../../../../store/hooks";

const steps = [
  { label: "Personal information", value: 0 },
  { label: "Identification", value: 1 },
  { label: "Address Information", value: 2 },
  { label: "Financial Information", value: 3 },
];

const FormStep = ({
  currentStep,
  currentStepStatus,
  stepStatus,
}: {
  currentStep: number;
  currentStepStatus: string;
  stepStatus: any;
}) => {
  const { textTheme } = useThemeClass();
  const dispatch = useAppDispatch();

  const onStepChange = (step: number) => {
    const selectedStepStatus = stepStatus[step].status;

    if (selectedStepStatus === "complete" || selectedStepStatus === "current") {
      dispatch(setCurrentStep(step));
      return;
    }

    if (step !== currentStep && step < currentStep) {
      if (currentStepStatus === "pending") {
        dispatch(setStepStatus("complete"));
      }
      dispatch(setCurrentStep(step));
    }
  };

  return (
    <Menu variant="transparent" className="px-2">
      {steps.map((step) => (
        <MenuItem
          key={step.value}
          eventKey={step.value.toString()}
          className={`mb-2`}
          onClick={() => onStepChange(step.value)}
          isActive={currentStep === step.value}
        >
          <span className="text-2xl ltr:mr-2 rtl:ml-2">
            {stepStatus[step.value].status === "complete" && (
              <HiCheckCircle className={textTheme} />
            )}
            {stepStatus[step.value].status === "current" && (
              <HiCheckCircle className="text-gray-400" />
            )}
            {stepStatus[step.value].status === "pending" &&
              currentStep === step.value && (
                <HiCheckCircle className="text-gray-400" />
              )}
            {stepStatus[step.value].status === "pending" &&
              currentStep !== step.value && (
                <HiLockClosed className="text-gray-400" />
              )}
            {stepStatus[step.value].status === "invalid" && (
              <HiCheckCircle className="text-gray-400" />
            )}
          </span>
          <span>{step.label}</span>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default FormStep;
