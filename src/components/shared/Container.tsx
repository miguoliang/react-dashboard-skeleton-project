import React, { ForwardedRef, forwardRef } from "react";
import classNames from "classnames";

const Container = forwardRef(
  (
    props: {
      className?: string;
      children?: React.ReactNode;
      asElement?: keyof JSX.IntrinsicElements;
    } & Record<string, any>,
    ref: ForwardedRef<any>,
  ) => {
    const {
      className,
      children,
      asElement: Component = "div",
      ...rest
    } = props;
    return React.createElement(
      Component,
      {
        ref,
        className: classNames("container mx-auto", className),
        ...rest,
      },
      children,
    );
  },
);

export default Container;
