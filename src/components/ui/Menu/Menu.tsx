import React, { MouseEvent } from "react";
import classNames from "classnames";
import { MenuContextProvider } from "./context/menuContext";
import { useConfig } from "../ConfigProvider";
import { NavMode } from "../../../constants/theme.constant";

const Menu = React.forwardRef<
  HTMLElement,
  {
    menuItemHeight?: number;
    variant?: NavMode;
    sideCollapsed?: boolean;
    defaultExpandedKeys?: string[];
    defaultActiveKeys?: string[];
    onSelect?: (eventKey: string, event: MouseEvent<Element>) => void;
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
  }
>((props, ref) => {
  const {
    children,
    className,
    defaultActiveKeys = [],
    defaultExpandedKeys = [],
    menuItemHeight = 40,
    onSelect,
    sideCollapsed = false,
    variant = "light",
    ...rest
  } = props;

  const menuDefaultClass = "menu";

  const { themeColor, primaryColorLevel } = useConfig();

  const menuColor = () => {
    if (variant === "themed") {
      return `bg-${themeColor}-${primaryColorLevel} ${menuDefaultClass}-${variant}`;
    }
    return `${menuDefaultClass}-${variant}`;
  };

  const menuClass = classNames(menuDefaultClass, menuColor(), className);

  return (
    <nav ref={ref} className={menuClass} {...rest}>
      <MenuContextProvider
        value={{
          onSelect,
          menuItemHeight,
          variant,
          sideCollapsed,
          defaultExpandedKeys,
          defaultActiveKeys,
        }}
      >
        {children}
      </MenuContextProvider>
    </nav>
  );
});

export default Menu;
