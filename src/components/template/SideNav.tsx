import React from "react";
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Spacer,
  Text,
  Tooltip,
  useBoolean,
  VStack,
} from "@chakra-ui/react";
import { useSideNav } from "hooks/useSideNav";
import navigationMenu, { NavigationMenuItem } from "configs/navigation.config";
import { motion } from "framer-motion";
import { Menu, MenuItem } from "./PopoverMenu";
import { HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";

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
            as={Link}
            fontSize={5}
            aria-label={item.title}
            icon={item.icon}
            bg={"transparent"}
            to={item.path}
          />
        </Tooltip>
      ) : (
        <Button
          as={Link}
          to={item.path}
          variant={"navigationRootMenuItem"}
          leftIcon={item.icon}
        >
          {item.title}
        </Button>
      );
    case "collapse":
      return sideNav.collapsed ? (
        <PopoverSubmenu key={item.key} item={item} />
      ) : (
        <ExpandableSubmenu key={item.key} item={item} />
      );
    case "title":
    default:
      return !sideNav.collapsed ? (
        <Text px={2} textColor={"gray.500"} fontSize={1}>
          {item.title}
        </Text>
      ) : (
        <></>
      );
  }
};

const PopoverSubmenu = ({ item }: { item: NavigationMenuItem }) => {
  return (
    <Menu item={item}>
      {item.children?.map((subItem) => {
        if (subItem.type === "collapse") {
          return <PopoverSubmenu key={subItem.key} item={subItem} />;
        } else if (subItem.type === "item") {
          return <MenuItem key={subItem.key} item={subItem} />;
        }
        return null;
      })}
    </Menu>
  );
};

const ExpandableSubmenu = ({ item }: { item: NavigationMenuItem }) => {
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
        <Icon as={HiChevronRight} />
      </motion.div>
    </HStack>
  );

  return (
    <motion.div
      key={item.key}
      className={"flex flex-col items-stretch overflow-hidden"}
      style={{ height: "40px" }}
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
        leftIcon={item.icon}
      >
        {!sideNav.collapsed && literal}
      </Button>
      <VStack pl={5} pt={1} gap={1} alignItems={"stretch"}>
        {item.children?.map((subItem) => (
          <NavMenuItem key={item.key} item={subItem} />
        ))}
      </VStack>
    </motion.div>
  );
};

export default SideNav;
