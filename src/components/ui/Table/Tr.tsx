import React, { ForwardedRef } from "react";
import classNames from "classnames";

const Tr = React.forwardRef(
  (
    props: {
      children?: React.ReactNode;
      asElement?: keyof JSX.IntrinsicElements;
      className?: string;
    } & Record<string, any>,
    ref: ForwardedRef<any>
  ) => {
    const { children, asElement: Component = "tr", className, ...rest } = props;

    const trClass = classNames(Component !== "tr" && "tr", className);

    return React.createElement(
      Component,
      {
        className: trClass,
        ref,
        ...rest,
      },
      children
    );
  }
);
export default Tr;
