import React, { Children, forwardRef } from "react";
import classNames from "classnames";
import mapCloneElement from "../utils/mapCloneElement";
import { StepStatus } from "../utils/constant";

type StepsProps = Partial<{
  vertical: boolean;
  current: number;
  status: StepStatus;
  onChange: (key: number) => void;
}> &
  Omit<JSX.IntrinsicElements["div"], "onChange">;

const Steps = forwardRef<HTMLDivElement, StepsProps>((props, ref) => {
  const {
    className,
    children,
    vertical = false,
    current = 0,
    status = "in_progress",
    onChange,
    ...rest
  } = props;

  const count = Children.count(children);

  const items = mapCloneElement(children, (item, index) => {
    const itemStyles = {
      flexBasis: index < count - 1 ? `${100 / (count - 1)}%` : undefined,
      maxWidth: index === count - 1 ? `${100 / count}%` : undefined,
    };
    const itemProps = {
      stepNumber: index + 1,
      status: "pending",
      style: !vertical ? itemStyles : undefined,
      isLast: index === count - 1,
      vertical: vertical,
      onStepChange: onChange ? () => onChange(index) : undefined,
      ...item.props,
    };

    if (status === "error" && index === current - 1) {
      itemProps.className = classNames("steps-item-error");
    }

    if (!item.props.status) {
      if (index === current) {
        itemProps.status = status;
        itemProps.className = classNames(
          itemProps.className,
          "steps-item-active"
        );
      } else if (index < current) {
        itemProps.status = "complete";
      }
    }
    return itemProps;
  });

  return (
    <div
      ref={ref}
      className={classNames("steps", vertical && "steps-vertical", className)}
      {...rest}
    >
      {items}
    </div>
  );
});

export default Steps;
