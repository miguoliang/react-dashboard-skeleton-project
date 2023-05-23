import React, { forwardRef, ReactNode } from "react";
import classNames from "classnames";
import { useConfig } from "../ConfigProvider";
import { HiCheck, HiX } from "react-icons/hi";
import { StepStatus } from "../utils/constant";

const STEP_STATUS_ICON = {
  complete: <HiCheck />,
  pending: null,
  "in-progress": null,
  error: <HiX />,
};

type StepItemProps = Partial<{
  vertical: boolean;
  stepNumber: number;
  status: StepStatus;
  title: string | ReactNode;
  description: string | ReactNode;
  customIcon: string | ReactNode;
  isLast: boolean;
  className: string;
  onStepChange: () => void;
}>;

const StepItem = forwardRef<HTMLDivElement, StepItemProps>((props, ref) => {
  const {
    className,
    status = "pending",
    customIcon,
    stepNumber,
    description,
    title,
    isLast,
    vertical,
    onStepChange,
    ...rest
  } = props;

  const { themeColor, primaryColorLevel } = useConfig();

  const color = `${themeColor}-${primaryColorLevel}`;

  let stepIcon = <span>{STEP_STATUS_ICON[status] ?? stepNumber}</span>;

  if (customIcon) {
    stepIcon = <span>{customIcon}</span>;
  }

  const stepItemClass = classNames(
    `step-item step-item-${status}`,
    vertical && "step-item-vertical",
    className,
  );

  const stepWrapperClass = classNames(
    "step-item-wrapper",
    onStepChange && "step-clickable",
  );

  const stepIconClass = classNames(
    `step-item-icon step-item-icon-${status}`,
    status === "complete" && `bg-${color} text-white`,
    status === "error" && `step-item-icon-error`,
    status === "in-progress" &&
      `text-${color} dark:text-gray-100 border-${color} step-item-icon-current`,
  );

  const stepConnectClass = classNames(
    "step-connect",
    vertical && "step-connect-vertical",
    status === "complete" ? `bg-${color}` : `inactive`,
  );

  const stepTitleClass = classNames(
    "step-item-title",
    status === "error" && `step-item-title-error`,
    onStepChange && status !== "error" && `hover:text-${color}`,
  );

  const handleStepChange = () => {
    onStepChange?.();
  };

  return (
    <div
      className={stepItemClass}
      {...rest}
      ref={ref}
      onClick={handleStepChange}
    >
      <div className={stepWrapperClass}>
        <div className={stepIconClass}>{stepIcon}</div>
        {title && (
          <div className="step-item-content">
            {title && <span className={stepTitleClass}>{title}</span>}
            {description && vertical && (
              <span className="step-item-description">{description}</span>
            )}
          </div>
        )}
      </div>
      {!isLast && <div className={stepConnectClass} />}
    </div>
  );
});

export default StepItem;
