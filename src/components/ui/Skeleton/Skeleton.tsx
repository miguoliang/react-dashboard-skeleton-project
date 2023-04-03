import React, { forwardRef } from "react";
import classNames from "classnames";

export type SkeletonProps = {
  asElement?: keyof JSX.IntrinsicElements;
  variant?: "circle" | "block";
  height?: number | string;
  width?: number | string;
  animation?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

const Skeleton = forwardRef((props: SkeletonProps, ref) => {
  const {
    animation = true,
    asElement: Component = "span",
    className,
    height,
    style,
    variant = "block",
    width,
  } = props;

  return React.createElement(Component, {
    ref,
    className: classNames(
      "skeleton",
      variant === "circle" && "skeleton-circle",
      variant === "block" && "skeleton-block",
      animation && "animate-pulse",
      className,
    ),
    style: {
      width,
      height,
      ...style,
    },
  });
});

export default Skeleton;
