import React, { ReactNode } from "react";
import classNames from "classnames";
import {
  HiChevronDown,
  HiChevronLeft,
  HiChevronRight,
  HiChevronUp,
} from "react-icons/hi";
import { Placement } from "../utils/constant";

const DropdownToggleDefaultContent = ({
  placement,
  children,
}: DropdownToggleProps) => {
  // TODO: impl rtl handling
  if (placement && placement.includes("middle-start")) {
    return (
      <>
        {children}
        <HiChevronRight />
      </>
    );
  }

  if (placement && placement.includes("middle-end")) {
    return (
      <>
        <HiChevronLeft />
        {children}
      </>
    );
  }

  if (placement && placement.includes("top")) {
    return (
      <>
        {children}
        <HiChevronUp />
      </>
    );
  }

  return (
    <>
      {children}
      <HiChevronDown />
    </>
  );
};

type CustomDropdownToggleProps = Partial<{
  renderTitle: ReactNode;
  placement: Placement;
  inSidenav: boolean;
  toggleClassName: string;
  disabled: boolean;
}>;

type DropdownToggleProps = CustomDropdownToggleProps &
  Omit<JSX.IntrinsicElements["div"], keyof CustomDropdownToggleProps>;

const DropdownToggle = React.forwardRef<HTMLDivElement, DropdownToggleProps>(
  (props, ref) => {
    const {
      className,
      renderTitle,
      children,
      placement,
      toggleClassName,
      disabled,
      ...rest
    } = props;

    const toggleClass = "dropdown-toggle";
    const disabledClass = "dropdown-toggle-disabled";

    const dropdownToggleClass = classNames(
      toggleClass,
      className,
      toggleClassName,
      disabled && disabledClass
    );

    const dropdownToggleDefaultClass = classNames(
      dropdownToggleClass,
      "dropdown-toggle-default"
    );

    if (renderTitle) {
      return (
        <div className={dropdownToggleClass} {...rest} ref={ref}>
          {renderTitle}
        </div>
      );
    }

    return (
      <div ref={ref} className={dropdownToggleDefaultClass} {...rest}>
        <span className="flex items-center">
          <DropdownToggleDefaultContent placement={placement}>
            {children}
          </DropdownToggleDefaultContent>
        </span>
      </div>
    );
  }
);

export default DropdownToggle;
