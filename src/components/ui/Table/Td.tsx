import React, { ForwardedRef } from "react";
import classNames from "classnames";

const Td = React.forwardRef(
  (
    props: {
      children?: React.ReactNode;
      className?: string;
      asElement?: keyof JSX.IntrinsicElements;
      colSpan?: number;
      style?: React.CSSProperties;
    },
    ref: ForwardedRef<any>,
  ) => {
    const { children, className, asElement: Component = "td", ...rest } = props;

    const tdClass = classNames(Component !== "td" && "td", className);
    return React.createElement(
      Component,
      {
        className: tdClass,
        ref,
        ...rest,
      },
      children,
    );
  },
);
export default Td;
