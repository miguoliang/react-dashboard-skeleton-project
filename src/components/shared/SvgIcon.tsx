import React, { forwardRef } from "react";
import classNames from "classnames";

const SvgIcon = forwardRef<HTMLSpanElement, JSX.IntrinsicElements["span"]>(
  (props, ref) => {
    const { children, className, ...rest } = props;

    return (
      <span
        ref={ref}
        className={classNames("inline-flex", className)}
        {...rest}
      >
        {children}
      </span>
    );
  },
);

export default SvgIcon;
