import React, { forwardRef, ReactNode } from "react";
import classNames from "classnames";
import { Tag } from "components/ui";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";
import growShrinkColor from "utils/growShrinkColor";
import { CustomRefElementProps } from "../ui/utils/constant";

type GrowShrinkTagProps = CustomRefElementProps<
  {
    value?: number;
    showIcon?: boolean;
    prefix?: ReactNode;
    suffix?: ReactNode;
  },
  "div"
>;

const GrowShrinkTag = forwardRef<HTMLDivElement, GrowShrinkTagProps>(
  (props, ref) => {
    const { value = 0, className, prefix, suffix, showIcon = true } = props;

    return (
      <Tag
        ref={ref}
        className={classNames(
          "gap-1 font-bold border-0",
          growShrinkColor(value, "text"),
          growShrinkColor(value, "bg"),
          className
        )}
      >
        {value !== 0 && (
          <span>
            {showIcon && (value > 0 ? <HiArrowUp /> : <HiArrowDown />)}
          </span>
        )}
        <span>
          {prefix}
          {value}
          {suffix}
        </span>
      </Tag>
    );
  }
);

export default GrowShrinkTag;
