import React, { ReactNode, useCallback, useContext } from "react";
import Menu, { DropdownMenuItemClickEventHandler } from "./Menu";
import MenuContext from "./context/menuContext";
import DropdownItem from "./DropdownItem";
import classNames from "classnames";
import { CustomRefElementProps, Placement } from "../utils/constant";

export type DropdownMenuProps = CustomRefElementProps<
  Partial<{
    title: ReactNode;
    eventKey: string;
    placement: Placement;
    icon: ReactNode;
    trigger: "click" | "hover" | "context";
    onToggle: DropdownMenuItemClickEventHandler;
    onSelect: DropdownMenuItemClickEventHandler;
    activeKey: string;
    ref: React.Ref<HTMLUListElement>;
  }>,
  "ul"
>;

const DropdownMenu = React.forwardRef<HTMLUListElement, DropdownMenuProps>(
  (props, ref) => {
    const { onToggle, eventKey, title, className, placement, ...rest } = props;

    const parentMenu = useContext(MenuContext);

    const handleToggleSubmenu: DropdownMenuItemClickEventHandler = useCallback(
      (_, e) => {
        console.log("toggle submenu");
        onToggle?.(eventKey || "", e);
      },
      [eventKey, onToggle]
    );

    const dropdownMenuDefaultClass = `dropdown-menu`;
    const dropdownMenuPositionClass = placement;

    const dropdownMenuClass = classNames(
      dropdownMenuDefaultClass,
      dropdownMenuPositionClass,
      className
    );

    const dropdownSubmenuClass = classNames(
      dropdownMenuDefaultClass,
      "dropdown-submenu"
    );

    const dropdownSubmenu = (
      <Menu
        className={dropdownSubmenuClass}
        ref={ref}
        onToggle={handleToggleSubmenu}
        placement={placement}
        {...rest}
      />
    );

    if (parentMenu) {
      const { icon, trigger } = props;
      const itemClassName = classNames(className);

      return (
        <DropdownItem
          icon={icon}
          trigger={trigger}
          className={itemClassName}
          submenu={dropdownSubmenu}
          eventKey={eventKey}
        >
          {title}
        </DropdownItem>
      );
    }

    return (
      <Menu
        className={dropdownMenuClass}
        placement={placement}
        ref={ref}
        {...rest}
      />
    );
  }
);

export default DropdownMenu;
