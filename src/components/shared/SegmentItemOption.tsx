import React, { forwardRef, ReactNode } from "react";
import classNames from "classnames";
import useThemeClass from "utils/hooks/useThemeClass";
import { HiCheckCircle } from "react-icons/hi";

export type SegmentItemOptionProps = Partial<{
  active: boolean;
  disabled: boolean;
  hoverable: boolean;
  defaultGutter: boolean;
  customCheck: ReactNode;
  children: ReactNode;
  className: string;
  onSegmentItemClick: () => void;
  ref: React.Ref<HTMLDivElement>;
}>;

const SegmentItemOption = forwardRef<HTMLDivElement, SegmentItemOptionProps>(
  (props, ref) => {
    const {
      active,
      children,
      className,
      customCheck,
      defaultGutter = true,
      disabled,
      hoverable,
      onSegmentItemClick,
    } = props;

    const { textTheme, borderTheme, ringTheme } = useThemeClass();

    return (
      <div
        ref={ref}
        className={classNames(
          "flex",
          !customCheck && "justify-between",
          "items-center",
          "border",
          "rounded-md ",
          "border-gray-200 dark:border-gray-600",
          defaultGutter && "py-5 px-4",
          "cursor-pointer",
          "select-none",
          "w-100",
          active && `ring-1 ${ringTheme} ${borderTheme}`,
          hoverable && `hover:ring-1 hover:${ringTheme} hover:${borderTheme}`,
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
        onClick={onSegmentItemClick}
      >
        {children}
        {active && !customCheck && (
          <HiCheckCircle className={classNames(textTheme, "text-2xl")} />
        )}
        {active && customCheck}
      </div>
    );
  },
);

export default SegmentItemOption;
