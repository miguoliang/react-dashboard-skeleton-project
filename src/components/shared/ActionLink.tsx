import React from "react";
import classNames from "classnames";
import useThemeClass from "utils/hooks/useThemeClass";
import { Link, LinkProps } from "react-router-dom";
import { CustomRefElementProps } from "../ui/utils/constant";

type ActionLinkProps = CustomRefElementProps<
  {
    themeColor?: boolean;
    to?: string;
    reloadDocument?: boolean;
  },
  "a"
>;

const ActionLink = (props: ActionLinkProps) => {
  const {
    children,
    className,
    themeColor = true,
    to,
    href = "",
    ...rest
  } = props;

  const { textTheme } = useThemeClass();

  const classNameProps = {
    className: classNames(
      themeColor && textTheme,
      "hover:underline",
      className
    ),
  };

  return to ? (
    <Link {...classNameProps} {...(rest as LinkProps)}>
      {children}
    </Link>
  ) : (
    <a href={href} {...classNameProps} {...rest}>
      {children}
    </a>
  );
};

export default ActionLink;
