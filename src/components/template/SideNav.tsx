import React, { cloneElement, useMemo } from "react";
import {
  Box,
  HStack,
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

const SideNav = () => {
  const sideNav = useSideNav();

  return (
    <motion.div
      className={
        "sticky h-screen overflow-x-hidden border-r-[1px] border-gray-200 bg-gray-100 flex-shrink-0 font-semibold"
      }
      animate={{ width: sideNav.collapsed ? 77 : 290 }}
      transition={{ type: "spring", bounce: 0, duration: 0.5 }}
    >
      <Box
        backgroundImage={`/img/logo/logo-light-full.png`}
        backgroundRepeat={"no-repeat"}
        height={"64px"}
        ml={"21px"}
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
        {navigationMenu.map((item) => NavMenuItem(item))}
      </VStack>
    </motion.div>
  );
};

const NavMenuItem = (item: NavigationMenuItem) => {
  const sideNav = useSideNav();
  const iconStyles = useMemo(() => {
    return {
      flexGrow: 0,
      flexShrink: 0,
      width: "28px",
      height: "28px",
      marginLeft: sideNav.collapsed ? "auto" : 0,
      marginRight: sideNav.collapsed ? "auto" : 0,
    };
  }, [sideNav.collapsed]);

  switch (item.type) {
    case "item":
      return (
        <Link key={item.key} to={item.path}>
          <HStack
            height={"40px"}
            alignItems={"center"}
            justifyContent={"start"}
            px={2}
            borderRadius={"md"}
            _hover={{ bg: "gray.300" }}
            gap={2}
          >
            {item.icon && cloneElement(item.icon, { style: iconStyles })}
            <Text flexGrow={1} opacity={sideNav.collapsed ? 0 : 1}>
              {item.title}
            </Text>
          </HStack>
        </Link>
      );
    case "collapse":
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
            px={2}
            gap={2}
            onClick={() => {
              setExpanded.toggle();
              expanded
                ? sideNav.addExpandedKey(item.key)
                : sideNav.removeExpandedKey(item.key);
            }}
          >
            {item.icon && cloneElement(item.icon, { style: iconStyles })}
            {literal}
          </HStack>
          <motion.div
            className={"flex flex-col pl-5 overflow-hidden"}
            animate={{
              height: expanded ? "auto" : "0px",
            }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          >
            {item.subMenu?.map((subItem) => NavMenuItem(subItem))}
          </motion.div>
        </Box>
      );
    case "title":
    default:
      return (
        !sideNav.collapsed && (
          <Text key={item.key} mt={4} mb={2} px={2} textColor={"gray.600"}>
            {item.title}
          </Text>
        )
      );
  }
};

export default SideNav;
