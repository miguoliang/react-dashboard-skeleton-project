import React, { ForwardedRef } from "react";
import classNames from "classnames";

const Th = React.forwardRef(
  (
    props: {
      children?: React.ReactNode;
      className?: string;
      asElement?: keyof JSX.IntrinsicElements;
    } & Record<string, any>,
    ref: ForwardedRef<any>
  ) => {
    const { children, className, asElement: Component = "th", ...rest } = props;

    const thClass = classNames(Component !== "th" && "th", className);

    return React.createElement(
      Component,
      {
        className: thClass,
        ref,
        ...rest,
      },
      children
    );
  }
);

export default Th;
