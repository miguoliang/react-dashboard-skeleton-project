import React, { cloneElement, CSSProperties } from "react";
import {
  Box,
  HStack,
  IconButton,
  Spacer,
  Text,
  useBoolean,
  VStack,
} from "@chakra-ui/react";
import { useSideNav } from "hooks/useSideNav";
import navigationMenu, { NavigationMenuItem } from "configs/navigation.config";
import { Link } from "react-router-dom";
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
      return (
        <Link to={item.path}>
          <HStack
            height={"40px"}
            alignItems={"center"}
            justifyContent={"start"}
            borderRadius={"md"}
            _hover={{ bg: sideNav.collapsed ? "transparent" : "gray.300" }}
          >
            {item.icon && (
              <IconButton
                aria-label={item.title}
                bg={"transparent"}
                _hover={{ bg: sideNav.collapsed ? "gray.200" : "transparent" }}
                icon={cloneElement(item.icon, { style: iconStyles })}
              />
            )}
            {(item.parentKey || !sideNav.collapsed) && (
              <Text flexGrow={1}>{item.title}</Text>
            )}
          </HStack>
        </Link>
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
    <Box key={item.key}>
      <HStack
        height={"40px"}
        cursor={"pointer"}
        borderRadius={"md"}
        justifyContent={"start"}
        _hover={{ bg: "gray.300" }}
        onClick={() => {
          setExpanded.toggle();
          expanded
            ? sideNav.addExpandedKey(item.key)
            : sideNav.removeExpandedKey(item.key);
        }}
      >
        {item.icon && (
          <IconButton
            aria-label={item.title}
            bg={"transparent"}
            _hover={{ bg: "transparent" }}
            icon={cloneElement(item.icon, { style: iconStyles })}
          />
        )}{" "}
        {!sideNav.collapsed && literal}
      </HStack>
      <motion.div
        className={"flex flex-col pl-5 overflow-hidden"}
        animate={{
          height: expanded ? "auto" : "0px",
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.5 }}
      >
        {item.children?.map((subItem) => (
          <NavMenuItem key={item.key} item={subItem} />
        ))}
      </motion.div>
    </Box>
  );
};

export default SideNav;
