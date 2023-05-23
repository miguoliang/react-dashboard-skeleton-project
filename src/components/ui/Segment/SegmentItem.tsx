import { forwardRef, ReactNode, useCallback } from "react";
import classNames from "classnames";
import { useSegment } from "./context";
import { CONTROL_SIZES } from "../utils/constant";
import { FunctionType } from "../../../constants/types";
import { concat, uniq } from "lodash";

const unwrapArray = (arg: any | any[]) => (Array.isArray(arg) ? arg[0] : arg);

const SegmentItem = forwardRef<
  HTMLButtonElement,
  {
    value: string;
    disabled?: boolean;
    children?: ReactNode | FunctionType;
    className?: string;
    type?: "button" | "submit" | "reset";
  }
>((props, ref) => {
  const { value: valueProp, children, className, disabled, ...rest } = props;

  const {
    size,
    value: valueContext,
    onActive,
    onDeactivate,
    selectionType,
  } = useSegment();

  const active = valueContext?.includes(valueProp);

  const getSegmentSize = useCallback(() => {
    let sizeClass = "";
    switch (size) {
      case "lg":
        sizeClass = classNames(
          `h-${CONTROL_SIZES.lg} md:px-8 py-2 px-4 text-base`,
        );
        break;
      case "sm":
        sizeClass = classNames(`h-${CONTROL_SIZES.sm} px-3 py-2 text-sm`);
        break;
      case "xs":
        sizeClass = classNames(`h-${CONTROL_SIZES.xs} px-3 py-1 text-xs`);
        break;
      default:
        sizeClass = classNames(`h-${CONTROL_SIZES.md} md:px-8 py-2 px-4`);
        break;
    }
    return sizeClass;
  }, [size]);

  const onSegmentItemClick = () => {
    if (disabled) {
      return;
    }
    if (!active) {
      if (selectionType === "single") {
        onActive?.([valueProp]);
      } else if (selectionType === "multiple") {
        const nextValue = concat(valueContext ?? [], valueProp);
        onActive?.(uniq(nextValue));
      }
    } else if (selectionType === "multiple") {
      onDeactivate?.(valueProp);
    }
  };

  const childrenProps = {
    ref: ref,
    active,
    onSegmentItemClick,
    disabled,
    value: valueProp,
    ...rest,
  };

  return typeof children === "function" ? (
    unwrapArray(children)(childrenProps)
  ) : (
    <button
      className={classNames(
        "segment-item segment-item-default",
        active && "segment-item-active",
        disabled && "segment-item-disabled",
        getSegmentSize(),
        className,
      )}
      onClick={onSegmentItemClick}
      {...rest}
    >
      {children}
    </button>
  );
});

export default SegmentItem;
