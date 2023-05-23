import React, {
  MouseEventHandler,
  ReactElement,
  ReactEventHandler,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import chainedFunction from "../utils/chainedFunction";
import MenuContext from "./context/menuContext";
import useUniqueId from "../hooks/useUniqueId";
import { useConfig } from "../ConfigProvider";
import DropdownMenuContext, {
  DropdownMenuContextProvider,
  useDropdownMenuContext,
} from "./context/dropdownMenuContext";
import classNames from "classnames";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import MenuItem from "../MenuItem";
import { DropdownMenuProps } from "./DropdownMenu";
import DropdownContext from "./context/dropdownContext";

const DropdownItem = (
  props: {
    active?: boolean;
    asElement?: keyof JSX.IntrinsicElements;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    dropdownItemVariant?: "divider" | "header" | "custom" | "default";
    eventKey?: string;
    icon?: React.ReactNode;
    onClick?: MouseEventHandler;
    onSelect?: (eventKey: string, event: React.MouseEvent) => void;
    style?: React.CSSProperties;
    submenu?: ReactElement<DropdownMenuProps>;
    trigger?: "click" | "hover" | "context";
  } & Record<string, any>,
) => {
  const {
    asElement: Component = "li",
    children,
    active: activeProp,
    disabled,
    className,
    submenu,
    style,
    eventKey,
    onClick,
    onSelect,
    dropdownItemVariant: variant = "default",
    ...rest
  } = props;

  const { mode, direction } = useConfig();

  const menuItemRef = useRef<HTMLLIElement | HTMLDivElement>(null);
  const menuItemId = useUniqueId("menu-item-");
  const subMenuRef = useRef<HTMLUListElement>(null);

  const dropdown = useContext(DropdownContext);
  const menu = useContext(MenuContext);
  const menuControl = useContext(DropdownMenuContext);
  const submenuControl = useDropdownMenuContext(subMenuRef);

  const open = submenuControl.open;

  const active =
    activeProp ||
    (menu?.activeKey && menu.activeKey === eventKey) ||
    (dropdown.activeKey && dropdown.activeKey === eventKey);

  const openSubmenuIfExists = useCallback(() => {
    if (!submenu) {
      return;
    }
    submenuControl.openMenu?.();
    submenuControl.focusItemAt?.(0);
  }, [submenu, submenuControl]);

  const activate: MouseEventHandler = useCallback(
    (e) => {
      onSelect?.(eventKey || "", e);
      menu?.onSelect?.(eventKey || "", e);
    },
    [eventKey, onSelect, menu],
  );

  const handleClick: MouseEventHandler = useCallback(
    (e) => {
      if (disabled) {
        return;
      }

      if (submenu) {
        openSubmenuIfExists();
      } else {
        activate(e);
      }
    },
    [disabled, submenu, openSubmenuIfExists, activate],
  );

  const handleMouseOver = useCallback(() => {
    if (submenu) {
      submenuControl.openMenu?.();
    }
  }, [submenu, submenuControl]);

  const handleMouseOut = useCallback(() => {
    if (submenu) {
      submenuControl.closeMenu?.();
    }
  }, [submenu, submenuControl]);

  const menuItemEventHandlers: Record<string, ReactEventHandler | null> = {
    onClick: chainedFunction(handleClick, onClick) as MouseEventHandler,
  };

  const { registerItem, unregisterItem } = menuControl;

  if (submenu) {
    menuItemEventHandlers.onMouseOver = handleMouseOver;
    menuItemEventHandlers.onMouseOut = handleMouseOut;
  }

  useEffect(() => {
    if (variant !== "divider" && variant !== "header") {
      registerItem?.(menuItemRef.current, { disabled });
    }
    return () => {
      unregisterItem?.(menuItemId);
    };
  }, [
    registerItem,
    unregisterItem,
    menuItemRef,
    menuItemId,
    disabled,
    variant,
  ]);

  if (variant === "divider" || variant === "header" || variant === "custom") {
    return React.createElement(
      Component,
      {
        ref: menuItemRef,
        id: menuItemId,
        style,
        className: classNames(`menu-item-${variant}`, className),
        ...(variant === "custom" ? menuItemEventHandlers : {}),
        ...rest,
      },
      (variant === "header" || variant === "custom") && children,
    );
  }

  function renderChildren() {
    if (!React.isValidElement(children)) {
      return children;
    }
    return React.cloneElement(children);
  }

  function renderSubmenu() {
    if (!React.isValidElement(submenu)) {
      return null;
    }

    return (
      <DropdownMenuContextProvider value={submenuControl}>
        {React.cloneElement(submenu, {
          ref: subMenuRef,
          hidden: !open,
        })}
      </DropdownMenuContextProvider>
    );
  }

  if (submenu) {
    return (
      <li
        {...rest}
        style={style}
        className="relative"
        {...menuItemEventHandlers}
      >
        <MenuItem
          asElement="div"
          ref={menuItemRef}
          id={menuItemId}
          isActive={active}
          eventKey={eventKey}
          variant={mode}
          className={classNames("dropdown-submenu-item", className)}
        >
          <span>{children}</span>
          {direction === "rtl" ? <HiChevronLeft /> : <HiChevronRight />}
        </MenuItem>
        {renderSubmenu()}
      </li>
    );
  }

  return (
    <MenuItem
      asElement="li"
      ref={menuItemRef}
      id={menuItemId}
      style={style}
      isActive={active}
      disabled={disabled}
      eventKey={eventKey}
      variant={mode}
      className={className}
      {...menuItemEventHandlers}
      {...rest}
    >
      {renderChildren()}
      {renderSubmenu()}
    </MenuItem>
  );
};

export default DropdownItem;
