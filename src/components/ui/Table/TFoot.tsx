import React, { ForwardedRef } from "react";
import classNames from "classnames";

const TFoot = React.forwardRef(
  (
    props: {
      children?: React.ReactNode;
      className?: string;
      asElement?: keyof JSX.IntrinsicElements;
    } & Record<string, any>,
    ref: ForwardedRef<any>,
  ) => {
    const {
      children,
      className,
      asElement: Component = "tfoot",
      ...rest
    } = props;

    const tBodyClass = classNames(Component !== "tfoot" && "tfoot", className);

    return React.createElement(
      Component,
      {
        className: tBodyClass,
        ref,
        ...rest,
      },
      children,
    );
  },
);

export default TFoot;
