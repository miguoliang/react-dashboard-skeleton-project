import React, { cloneElement, CSSProperties } from "react";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Spacer,
  Text,
  Tooltip,
  useBoolean,
  VStack,
} from "@chakra-ui/react";
import { useSideNav } from "hooks/useSideNav";
import navigationMenu, { NavigationMenuItem } from "configs/navigation.config";
import { HiChevronRight } from "react-icons/hi";
import { motion } from "framer-motion";
import { Menu, MenuItem } from "./PopoverMenu";

const SideNav = () => {
  const sideNav = useSideNav();

  return (
    <motion.div
      className={
        "sticky h-screen overflow-x-hidden border-r-[1px] border-gray-200 bg-gray-100 flex-shrink-0 font-semibold"
      }
      animate={{ width: sideNav.collapsed ? 73 : 290 }}
      transition={{ type: "spring", bounce: 0, duration: 0.5 }}
    >
      <Box
        backgroundImage={`/img/logo/logo-light-full.png`}
        backgroundRepeat={"no-repeat"}
        height={"64px"}
        ml={"18px"}
        mr={"auto"}
        animation={{
          px: sideNav.collapsed ? 0 : 6,
          width: sideNav.collapsed ? "35px" : "130px",
        }}
        transition={"all 0.5s spring"}
      />
      <VStack
        flexDirection={"column"}
        alignItems={"stretch"}
        px={4}
        gap={2}
        mt={2}
      >
        {navigationMenu.map((item) => (
          <NavMenuItem key={item.key} item={item} />
        ))}
      </VStack>
    </motion.div>
  );
};

const NavMenuItem = ({ item }: { item: NavigationMenuItem }) => {
  const sideNav = useSideNav();
  const iconStyles = {
    flexGrow: 0,
    flexShrink: 0,
    width: "28px",
    height: "28px",
    marginLeft: sideNav.collapsed ? "auto" : 0,
    marginRight: sideNav.collapsed ? "auto" : 0,
  };

  switch (item.type) {
    case "item":
      return sideNav.collapsed ? (
        <Tooltip
          hasArrow
          variant={"navigationRootMenuItem"}
          label={item.title}
          placement={"right"}
        >
          <IconButton
            aria-label={item.title}
            variant={"navigationRootMenuItem"}
            icon={item.icon && cloneElement(item.icon, { style: iconStyles })}
          />
        </Tooltip>
      ) : (
        <Button
          variant={"navigationRootMenuItem"}
          leftIcon={item.icon && cloneElement(item.icon, { style: iconStyles })}
        >
          {item.title}
        </Button>
      );
    case "collapse":
      return sideNav.collapsed ? (
        <PopoverSubmenu key={item.key} item={item} iconStyles={iconStyles} />
      ) : (
        <ExpandableSubmenu key={item.key} item={item} iconStyles={iconStyles} />
      );
    case "title":
    default:
      return !sideNav.collapsed ? (
        <Text mt={4} mb={2} px={2} textColor={"gray.600"}>
          {item.title}
        </Text>
      ) : (
        <></>
      );
  }
};

const PopoverSubmenu = ({
  item,
  iconStyles,
}: {
  item: NavigationMenuItem;
  iconStyles: CSSProperties;
}) => {
  return (
    <Menu item={item} iconStyles={iconStyles}>
      {item.children?.map((subItem) => {
        if (subItem.type === "collapse") {
          return (
            <PopoverSubmenu
              key={subItem.key}
              item={subItem}
              iconStyles={iconStyles}
            />
          );
        } else if (subItem.type === "item") {
          return <MenuItem key={subItem.key} item={subItem} />;
        }
        return null;
      })}
    </Menu>
  );
};

const ExpandableSubmenu = ({
  item,
  iconStyles,
}: {
  item: NavigationMenuItem;
  iconStyles: CSSProperties;
}) => {
  const sideNav = useSideNav();
  const [expanded, setExpanded] = useBoolean(
    sideNav.expandedKeys.has(item.key),
  );
  const literal = (
    <HStack flexGrow={1} opacity={sideNav.collapsed ? 0 : 1}>
      <Text>{item.title}</Text>
      <Spacer />
      <motion.div
        animate={{ rotate: expanded ? 90 : 0 }}
        transition={{ type: "spring", bounce: 0, duration: 0.5 }}
      >
        <HiChevronRight size={"20px"} />
      </motion.div>
    </HStack>
  );

  return (
    <motion.div
      key={item.key}
      className={"flex flex-col items-stretch overflow-hidden h-[40px]"}
      animate={{
        height: expanded ? "auto" : "40px",
      }}
      transition={{ type: "spring", bounce: 0, duration: 0.5 }}
    >
      <Button
        variant={"navigationRootMenuItem"}
        flexShrink={0}
        height={"40px"}
        width={"full"}
        onClick={() => {
          setExpanded.toggle();
          !expanded
            ? sideNav.addExpandedKey(item.key)
            : sideNav.removeExpandedKey(item.key);
        }}
        leftIcon={item.icon && cloneElement(item.icon, { style: iconStyles })}
      >
        {!sideNav.collapsed && literal}
      </Button>
      <Box pl={5}>
        {item.children?.map((subItem) => (
          <NavMenuItem key={item.key} item={subItem} />
        ))}
      </Box>
    </motion.div>
  );
};

export default SideNav;
