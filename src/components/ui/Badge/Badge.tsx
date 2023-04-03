import React from "react";
import classNames from "classnames";

type BadgeProps = Partial<{
  innerClass: string;
  content: string | number;
  maxCount: number;
  badgeStyle: object;
}> &
  JSX.IntrinsicElements["span"];

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const {
    content,
    maxCount = 99,
    className,
    innerClass,
    children,
    badgeStyle,
    ...rest
  } = props;

  const dot = typeof content !== "number" && typeof content !== "string";

  const badgeClass = classNames(dot ? "badge-dot" : "badge", innerClass);

  const renderBadge = () => {
    if (children) {
      return (
        <span
          className={classNames("badge-wrapper", className)}
          ref={ref}
          {...rest}
        >
          <span
            className={classNames(badgeClass, "badge-inner")}
            style={badgeStyle}
          >
            {typeof content === "number" && content > maxCount
              ? `${maxCount}+`
              : content}
          </span>
          {children}
        </span>
      );
    }
    return (
      <span
        className={classNames(badgeClass, className)}
        ref={ref}
        style={badgeStyle}
        {...rest}
      >
        {content}
      </span>
    );
  };

  return renderBadge();
});

export default Badge;
