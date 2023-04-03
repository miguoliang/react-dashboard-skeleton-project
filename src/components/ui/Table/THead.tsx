import React, { ForwardedRef } from "react";
import classNames from "classnames";

const THead = React.forwardRef(
  (
    props: {
      children?: React.ReactNode;
      asElement?: keyof JSX.IntrinsicElements;
      className?: string;
    } & Record<string, any>,
    ref: ForwardedRef<any>
  ) => {
    const {
      children,
      asElement: Component = "thead",
      className,
      ...rest
    } = props;

    const tHeadClass = classNames(Component !== "thead" && "thead", className);

    return React.createElement(
      Component,
      {
        className: tHeadClass,
        ref,
        ...rest,
      },
      children
    );
  }
);

export default THead;
