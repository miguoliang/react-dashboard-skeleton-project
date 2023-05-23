import React, { KeyboardEventHandler } from "react";
import { MenuContextProvider } from "./context/menuContext";
import {
  DropdownMenuContextProvider,
  useDropdownMenuContext,
} from "./context/dropdownMenuContext";
import useUniqueId from "../hooks/useUniqueId";
import {
  AnimatePresence,
  motion,
  MotionProps,
  Target,
  VariantLabels,
} from "framer-motion";
import { CustomRefElementProps, Placement } from "../utils/constant";

export type DropdownMenuItemClickEventHandler = (
  eventKey: string,
  event: React.MouseEvent,
) => void;

type DropdownMenuProps = CustomRefElementProps<
  Partial<{
    activeKey: string;
    classPrefix: string;
    hidden: boolean;
    menuClass: string;
    onKeyDown: KeyboardEventHandler;
    onSelect: DropdownMenuItemClickEventHandler;
    onToggle: DropdownMenuItemClickEventHandler;
    placement: Placement;
  }>,
  "ul"
>;

const Menu = React.forwardRef<
  HTMLUListElement,
  Omit<DropdownMenuProps, keyof MotionProps>
>((props, ref) => {
  const {
    children,
    activeKey,
    onSelect,
    hidden,
    placement,
    menuClass,
    ...rest
  } = props;

  const menuId = useUniqueId("menu-");
  const menuControl = useDropdownMenuContext(ref);

  const getTransform = (deg: number) => {
    const rotate = `rotateX(${deg}deg)`;
    if (placement?.includes("center")) {
      return `${rotate} translateX(-50%)`;
    }
    return rotate;
  };

  const enterStyle: boolean | Target | VariantLabels = {
    opacity: 1,
    visibility: "visible",
    transform: getTransform(0),
  };
  const exitStyle: boolean | Target | VariantLabels = {
    opacity: 0,
    visibility: "hidden",
    transform: getTransform(40),
  };
  const initialStyle = exitStyle;

  return (
    <MenuContextProvider
      value={{
        activeKey,
        onSelect,
      }}
    >
      <DropdownMenuContextProvider value={menuControl}>
        <AnimatePresence exitBeforeEnter>
          {!hidden && (
            <motion.ul
              id={menuId}
              ref={ref}
              initial={initialStyle}
              animate={enterStyle}
              exit={exitStyle}
              transition={{ duration: 0.15, type: "tween" }}
              className={menuClass}
              {...rest}
            >
              {children}
            </motion.ul>
          )}
        </AnimatePresence>
      </DropdownMenuContextProvider>
    </MenuContextProvider>
  );
});

export default Menu;
