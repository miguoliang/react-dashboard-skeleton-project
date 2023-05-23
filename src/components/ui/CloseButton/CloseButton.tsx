import React, { MouseEventHandler } from "react";
import { HiX } from "react-icons/hi";
import classNames from "classnames";

type CloseButtonProps = Partial<{
  svgClass: string;
  absolute: boolean;
  closeButtonAbsoluteClass: string;
  className: string;
  defaultStyle: boolean;
  onClick: MouseEventHandler;
}>;

const CloseButton = React.forwardRef<HTMLSpanElement, CloseButtonProps>(
  (props, ref) => {
    const {
      absolute,
      className,
      defaultStyle = true,
      svgClass,
      onClick,
    } = props;
    const closeButtonAbsoluteClass = "absolute z-10";

    const closeButtonClass = classNames(
      "close-btn",
      defaultStyle && "close-btn-default",
      absolute && closeButtonAbsoluteClass,
      className,
    );

    return (
      <span
        className={closeButtonClass}
        role="button"
        ref={ref}
        onClick={onClick}
      >
        <HiX className={svgClass} />
      </span>
    );
  },
);

export default CloseButton;
