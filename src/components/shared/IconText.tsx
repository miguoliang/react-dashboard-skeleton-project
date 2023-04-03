import React from "react";
import classNames from "classnames";

type IconTextProps = Partial<{
  asElement: keyof JSX.IntrinsicElements;
  icon: React.ReactNode;
  className: string;
  children: React.ReactNode;
  textClass: string;
}>;

const IconText = ({
  className,
  asElement: Component = "span",
  icon,
  children,
}: IconTextProps) => {
  return React.createElement(
    Component,
    {
      className: classNames("flex items-center gap-2", className),
    },
    icon,
    children,
  );
};

export default IconText;
