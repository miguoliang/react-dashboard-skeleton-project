import React, {
  MouseEventHandler,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import DropdownMenu from "./DropdownMenu";
import DropdownToggle from "./DropdownToggle";
import useUniqueId from "../hooks/useUniqueId";
import DropdownContext from "./context/dropdownContext";
import DropdownMenuContext, {
  useDropdownMenuContext,
} from "./context/dropdownMenuContext";
import chainedFunction from "../utils/chainedFunction";
import useRootClose from "../hooks/useRootClose";
import arrayIndexOf from "../utils/arrayIndexOf";
import { CustomRefElementProps, Placement } from "../utils/constant";
import { FunctionType } from "constants/types";
import { MenuItemSelectEventHandler } from "../MenuItem";

type DropdownProps = CustomRefElementProps<
  Partial<{
    trigger: "click" | "hover" | "context";
    placement: Placement;
    menuClass: string;
    menuStyle: object;
    disabled: boolean;
    title: string;
    renderTitle: ReactNode;
    activeKey: string;
    toggleClassName: string;
    onMouseEnter: FunctionType;
    onMouseLeave: FunctionType;
    onContextMenu: FunctionType;
    onSelect: FunctionType;
    onOpen: FunctionType;
    onClose: FunctionType;
    onToggle: FunctionType;
  }>,
  "div"
>;

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (props, ref) => {
    const {
      title,
      children,
      menuClass,
      menuStyle,
      disabled,
      renderTitle,
      placement = "bottom-start",
      activeKey,
      toggleClassName,
      trigger = "click",
      style,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onContextMenu,
      onSelect,
      onOpen,
      onClose,
      onToggle,
      ...rest
    } = props;

    const overlayTarget = useRef<HTMLUListElement>(null);
    const triggerTarget = useRef<HTMLDivElement>(null);
    const menuControl = useDropdownMenuContext(overlayTarget);
    const open = menuControl.open;

    const buttonId = useUniqueId("dropdown-toggle-");
    const menuId = useUniqueId("base-menu-");

    const handleToggle = useCallback(
      (isOpen?: boolean) => {
        const nextOpen = typeof isOpen === "undefined" ? !open : isOpen;
        const fn = nextOpen ? onOpen : onClose;
        fn?.();
        onToggle?.(nextOpen);
        if (nextOpen) {
          menuControl.openMenu?.();
        } else {
          menuControl.closeMenu?.();
        }
      },
      [onClose, onOpen, onToggle, open, menuControl],
    );

    const handleClick: MouseEventHandler = useCallback(
      (e) => {
        e.preventDefault();
        if (disabled) {
          return;
        }
        handleToggle();
      },
      [disabled, handleToggle],
    );

    const handleMouseEnter = useCallback(() => {
      if (!disabled) {
        handleToggle(true);
      }
    }, [disabled, handleToggle]);

    const handleMouseLeave = useCallback(() => {
      if (!disabled) {
        handleToggle(false);
      }
    }, [disabled, handleToggle]);

    const handleSelect: MenuItemSelectEventHandler = (eventKey, e) => {
      onSelect?.(eventKey, e);
      handleToggle(false);
    };

    useRootClose(
      () => {
        handleToggle();
      },
      {
        triggerTarget,
        overlayTarget,
        disabled: !open,
      },
    );

    const dropdownProps = {
      onMouseEnter,
      onMouseLeave,
    };

    const toggleEventHandlers = {
      onClick: onClick,
      onContextMenu,
    };

    if (arrayIndexOf("click", trigger)) {
      toggleEventHandlers.onClick = chainedFunction(
        handleClick,
        toggleEventHandlers.onClick,
      );
    }

    if (arrayIndexOf("context", trigger)) {
      toggleEventHandlers.onContextMenu = chainedFunction(
        handleClick,
        onContextMenu,
      );
    }

    if (arrayIndexOf("hover", trigger)) {
      dropdownProps.onMouseEnter = chainedFunction(
        handleMouseEnter,
        onMouseEnter,
      );
      dropdownProps.onMouseLeave = chainedFunction(
        handleMouseLeave,
        onMouseLeave,
      );
    }

    const toggleElement = (
      <DropdownToggle
        {...rest}
        {...toggleEventHandlers}
        id={buttonId}
        ref={triggerTarget}
        className={toggleClassName}
        renderTitle={renderTitle}
        disabled={disabled}
        placement={placement}
      >
        {title}
      </DropdownToggle>
    );

    const menuElement = (
      <DropdownMenu
        className={menuClass}
        style={menuStyle}
        onSelect={handleSelect}
        activeKey={activeKey}
        ref={overlayTarget}
        hidden={!open}
        placement={placement}
        id={menuId}
      >
        {children}
      </DropdownMenu>
    );

    return (
      <DropdownContext.Provider value={{ activeKey }}>
        <div {...dropdownProps} ref={ref} style={style} className="dropdown">
          {toggleElement}
          <DropdownMenuContext.Provider value={menuControl}>
            {menuElement}
          </DropdownMenuContext.Provider>
        </div>
      </DropdownContext.Provider>
    );
  },
);

export default Dropdown;
