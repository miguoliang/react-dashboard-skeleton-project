import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  offset,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
} from "@floating-ui/react";
import * as React from "react";
import { cloneElement, CSSProperties } from "react";
import { noop } from "lodash";
import { Box, Button } from "@chakra-ui/react";
import { NavigationMenuItem } from "../../configs/navigation.config";
import { HiChevronRight } from "react-icons/hi";

const MenuContext = React.createContext<{
  getItemProps: (
    userProps?: React.HTMLProps<HTMLElement>,
  ) => Record<string, unknown>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setHasFocusInside: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}>({
  getItemProps: () => ({}),
  activeIndex: null,
  setActiveIndex: noop,
  setHasFocusInside: noop,
  isOpen: false,
});

export const MenuComponent = React.forwardRef<
  HTMLButtonElement,
  {
    item: NavigationMenuItem;
    iconStyles: CSSProperties;
  } & React.HTMLProps<HTMLButtonElement>
>(({ item: menuItem, iconStyles, children, ...props }, forwardedRef) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hasFocusInside, setHasFocusInside] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const elementsRef = React.useRef<Array<HTMLButtonElement | null>>([]);
  const labelsRef = React.useRef<Array<string | null>>([]);
  const parent = React.useContext(MenuContext);

  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const item = useListItem();

  const isNested = parentId != null;

  const { floatingStyles, refs, context } = useFloating<HTMLButtonElement>({
    nodeId,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "right-start",
    middleware: [
      offset({ mainAxis: isNested ? 20 : 10, crossAxis: isNested ? -9 : 0 }),
      flip(),
      shift(),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    enabled: true,
    delay: { open: 75 },
    handleClose: safePolygon({ blockPointerEvents: true }),
  });
  const role = useRole(context, { role: "menu" });
  const dismiss = useDismiss(context, { bubbles: true });
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    nested: isNested,
    onNavigate: setActiveIndex,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    onMatch: isOpen ? setActiveIndex : undefined,
    activeIndex,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [hover, role, dismiss, listNavigation, typeahead],
  );

  // Event emitter allows you to communicate across tree components.
  // This effect closes all menus when an item gets clicked anywhere
  // in the tree.
  React.useEffect(() => {
    if (!tree) return;

    function handleTreeClick() {
      setIsOpen(false);
    }

    function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        setIsOpen(false);
      }
    }

    tree.events.on("click", handleTreeClick);
    tree.events.on("menuopen", onSubMenuOpen);

    return () => {
      tree.events.off("click", handleTreeClick);
      tree.events.off("menuopen", onSubMenuOpen);
    };
  }, [tree, nodeId, parentId]);

  React.useEffect(() => {
    if (isOpen && tree) {
      tree.events.emit("menuopen", { parentId, nodeId });
    }
  }, [tree, isOpen, nodeId, parentId]);

  return (
    <FloatingNode id={nodeId}>
      <Button
        ref={useMergeRefs([refs.setReference, item.ref, forwardedRef])}
        tabIndex={
          !isNested ? undefined : parent.activeIndex === item.index ? 0 : -1
        }
        variant={isNested ? "dropdownMenuItem" : "solid"}
        role={isNested ? "menuitem" : undefined}
        data-open={isOpen ? "" : undefined}
        data-nested={isNested ? "" : undefined}
        data-focus-inside={hasFocusInside ? "" : undefined}
        {...getReferenceProps(
          parent.getItemProps({
            ...props,
            onFocus(event: React.FocusEvent<HTMLButtonElement>) {
              props.onFocus?.(event);
              setHasFocusInside(false);
              parent.setHasFocusInside(true);
            },
          }),
        )}
        rightIcon={isNested ? <HiChevronRight /> : undefined}
      >
        {menuItem.icon && cloneElement(menuItem.icon, { style: iconStyles })}
        {isNested && menuItem.title}
      </Button>
      <MenuContext.Provider
        value={{
          activeIndex,
          setActiveIndex,
          getItemProps,
          setHasFocusInside,
          isOpen,
        }}
      >
        <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
          {isOpen && (
            <FloatingPortal>
              <FloatingFocusManager
                context={context}
                modal={false}
                initialFocus={isNested ? -1 : 0}
                returnFocus={!isNested}
              >
                <Box
                  ref={refs.setFloating}
                  style={floatingStyles}
                  {...getFloatingProps()}
                  bg={"white"}
                  borderRadius={"lg"}
                  borderWidth={1}
                  p={2}
                >
                  {children}
                </Box>
              </FloatingFocusManager>
            </FloatingPortal>
          )}
        </FloatingList>
      </MenuContext.Provider>
    </FloatingNode>
  );
});

export const MenuItem = React.forwardRef<
  HTMLButtonElement,
  {
    item: NavigationMenuItem;
    disabled?: boolean;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ item: menuItem, disabled, ...props }, forwardedRef) => {
  const menu = React.useContext(MenuContext);
  const item = useListItem({ label: disabled ? null : menuItem.title });
  const tree = useFloatingTree();
  const isActive = item.index === menu.activeIndex;

  return (
    <Button
      {...props}
      ref={useMergeRefs([item.ref, forwardedRef])}
      type="button"
      role="menuitem"
      variant={"dropdownMenuItem"}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      {...menu.getItemProps({
        onClick(event: React.MouseEvent<HTMLButtonElement>) {
          props.onClick?.(event);
          tree?.events.emit("click");
        },
        onFocus(event: React.FocusEvent<HTMLButtonElement>) {
          props.onFocus?.(event);
          menu.setHasFocusInside(true);
        },
      })}
    >
      {menuItem.title}
    </Button>
  );
});

export const Menu = React.forwardRef<
  HTMLButtonElement,
  {
    item: NavigationMenuItem;
    iconStyles: CSSProperties;
  } & React.HTMLProps<HTMLButtonElement>
>((props, ref) => {
  const parentId = useFloatingParentNodeId();

  if (parentId === null) {
    return (
      <FloatingTree>
        <MenuComponent {...props} ref={ref} />
      </FloatingTree>
    );
  }

  return <MenuComponent {...props} ref={ref} />;
});