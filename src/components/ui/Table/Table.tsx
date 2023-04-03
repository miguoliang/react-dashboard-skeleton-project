import React, { ForwardedRef } from "react";
import classNames from "classnames";

const Table = React.forwardRef(
  (
    props: {
      children?: React.ReactNode;
      className?: string;
      hoverCapable?: boolean;
      compact?: boolean;
      asElement?: keyof JSX.IntrinsicElements;
      borderlessRow?: boolean;
      overflow?: boolean;
    },
    ref: ForwardedRef<any>
  ) => {
    const {
      borderlessRow = false,
      children,
      className,
      hoverCapable = true,
      compact = false,
      overflow = true,
      asElement: Component = "table",
      ...rest
    } = props;

    const tableClass = classNames(
      Component === "table" ? "table-default" : "table-flex",
      hoverCapable && "table-hover",
      compact && "table-compact",
      borderlessRow && "borderless-row",
      className
    );

    return (
      <div className={classNames(overflow && "overflow-x-auto")}>
        {React.createElement(
          Component,
          {
            className: tableClass,
            ref,
            ...rest,
          },
          children
        )}
      </div>
    );
  }
);

export default Table;
