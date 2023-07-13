import React from "react";
import { Box, Flex, Image, Spacer, Text, useBoolean } from "@chakra-ui/react";
import { useSideNav } from "hooks/useSideNav";
import navigationMenu, { NavigationMenuItem } from "configs/navigation.config";
import { Link } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";
import { motion } from "framer-motion";

const SideNav = () => {
  const sideNav = useSideNav();

  return (
    <Box
      as={motion.div}
      position={"sticky"}
      height={"100vh"}
      overflow={"hidden"}
      borderRight={"1px"}
      borderColor={"gray.200"}
      bg={"gray.100"}
      flexShrink={0}
      fontWeight={"semibold"}
      animate={{ width: sideNav.collapsed ? 60 : 290 }}
    >
      <Image
        src={`/img/logo/logo-light-${
          sideNav.collapsed ? "streamline" : "full"
        }.png`}
        px={6}
      />
      <Flex flexDirection={"column"} px={4}>
        {navigationMenu.map((item) => NavMenuItem(item))}
      </Flex>
    </Box>
  );
};

const NavMenuItem = (item: NavigationMenuItem) => {
  const sideNav = useSideNav();

  switch (item.type) {
    case "item":
      return (
        <Link key={item.key} to={item.path}>
          <Flex
            alignItems={"center"}
            px={2}
            borderRadius={"md"}
            _hover={{ bg: "gray.300" }}
          >
            {item.icon && <Box mr={2}>{item.icon}</Box>}
            <Text lineHeight={"40px"}>{item.title}</Text>
          </Flex>
        </Link>
      );
    case "collapse":
      const [expanded, setExpanded] = useBoolean(
        sideNav.expandedKeys.has(item.key),
      );
      return (
        <Box key={item.key}>
          <Flex
            alignItems={"center"}
            cursor={"pointer"}
            borderRadius={"md"}
            _hover={{ bg: "gray.300" }}
            px={2}
            onClick={() => {
              setExpanded.toggle();
              expanded
                ? sideNav.addExpandedKey(item.key)
                : sideNav.removeExpandedKey(item.key);
            }}
          >
            {item.icon && <Box mr={2}>{item.icon}</Box>}
            <Text lineHeight={"40px"}>{item.title}</Text>
            <Spacer />
            <motion.div animate={{ rotate: expanded ? 90 : 0 }}>
              <HiChevronRight />
            </motion.div>
          </Flex>
          <motion.div
            className={"flex flex-col pl-5 overflow-hidden"}
            animate={{
              height: expanded ? "auto" : "0px",
            }}
          >
            {item.subMenu?.map((subItem) => NavMenuItem(subItem))}
          </motion.div>
        </Box>
      );
    case "title":
    default:
      return (
        <Text key={item.key} mt={4} mb={2} px={2} textColor={"gray.600"}>
          {item.title}
        </Text>
      );
  }
};

export default SideNav;
