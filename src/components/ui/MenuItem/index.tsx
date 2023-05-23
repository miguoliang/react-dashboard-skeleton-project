import React, {
  CSSProperties,
  ForwardedRef,
  MouseEvent,
  MouseEventHandler,
} from "react";
import classNames from "classnames";
import { NavMode } from "../../../constants/theme.constant";
import { useConfig } from "../ConfigProvider";

export type MenuItemSelectEventHandler = (
  eventKey?: string,
  event?: MouseEvent<Element>,
) => void;

const MenuItem = React.forwardRef(
  (
    props: {
      asElement?: keyof JSX.IntrinsicElements;
      children?: React.ReactNode;
      className?: string;
      disabled?: boolean;
      eventKey?: string;
      isActive?: boolean;
      menuItemHeight?: number;
      onSelect?: (eventKey?: string, event?: MouseEvent<Element>) => void;
      style?: CSSProperties;
      variant?: NavMode;
    } & Record<string, any>,
    ref: ForwardedRef<any>,
  ) => {
    const {
      asElement: Component = "li",
      children,
      className,
      disabled,
      eventKey,
      isActive,
      menuItemHeight = 35,
      onSelect,
      style,
      variant = useConfig().navMode,
      ...rest
    } = props;

    const menuItemActiveClass = `menu-item-active`;
    const menuItemHoverClass = `menu-item-hoverable`;
    const disabledClass = "menu-item-disabled";
    const menuItemClass = classNames(
      "menu-item",
      `menu-item-${variant}`,
      isActive && menuItemActiveClass,
      disabled && disabledClass,
      !disabled && menuItemHoverClass,
      className,
    );

    const handleOnClick: MouseEventHandler = (e) => {
      onSelect?.(eventKey, e);
    };

    return React.createElement(
      Component,
      {
        ref,
        className: menuItemClass,
        style: { height: `${menuItemHeight}px`, ...style },
        onClick: handleOnClick,
        ...rest,
      },
      children,
    );
  },
);

export default MenuItem;
