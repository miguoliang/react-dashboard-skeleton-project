import React from "react";
import classNames from "classnames";

const withHeaderItem =
  (Component: any) =>
  (
    props: Record<string, any> & {
      className?: string;
      hoverable?: boolean;
    }
  ) => {
    const { className, hoverable = true } = props;

    return React.createElement(Component, {
      ...props,
      className: classNames(
        "header-action-item",
        hoverable && "header-action-item-hoverable",
        className
      ),
    });
  };

export default withHeaderItem;
