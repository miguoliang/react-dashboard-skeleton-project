import React, { forwardRef, ReactNode } from "react";
import classNames from "classnames";
import { CustomRefElementProps } from "../utils/constant";

type TagProps = CustomRefElementProps<
  {
    prefix?: ReactNode;
    suffix?: ReactNode;
    prefixClass?: string;
    suffixClass?: string;
  },
  "div"
>;

const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  const {
    className,
    children,
    prefix,
    suffix,
    prefixClass,
    suffixClass,
    ...rest
  } = props;

  return (
    <div className={classNames("tag", className)} ref={ref} {...rest}>
      {prefix && typeof prefix === "boolean" && (
        <span className={classNames("tag-affix tag-prefix", prefixClass)} />
      )}
      {typeof prefix === "object" && prefix}
      {children}
      {suffix && typeof suffix === "boolean" && (
        <span className={classNames("tag-affix tag-suffix", suffixClass)} />
      )}
      {typeof suffix === "object" && suffix}
    </div>
  );
});

export default Tag;
