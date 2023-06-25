import React from "react";
import {
  Avatar,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HiOutlineClock, HiOutlineCog, HiOutlineLogout } from "react-icons/hi";
import { APP_PREFIX_PATH } from "../../constants/route.constant";
import { useAuth } from "../../hooks/useAuth";

const menuList = [
  {
    label: "Password",
    path: `${APP_PREFIX_PATH}/account/settings/password`,
    icon: <HiOutlineCog />,
  },
  {
    label: "Subscription",
    path: `${APP_PREFIX_PATH}/account/settings/subscription`,
    icon: <HiOutlineClock />,
  },
];

export const UserMenu = () => {
  const auth = useAuth();

  const UserAvatar = (
    <HStack gap={2}>
      <Avatar size="sm" src="/img/avatars/thumb-1.jpg" />
      <Flex direction={"column"} alignItems={"start"}>
        <Text fontSize={"sm"} casing={"capitalize"}>
          user
        </Text>
        <Text fontWeight={"bold"}>{auth.user?.profile.email}</Text>
      </Flex>
    </HStack>
  );

  return (
    <Menu autoSelect={false} placement="bottom-end">
      <MenuButton>{UserAvatar}</MenuButton>
      <MenuList>
        {menuList.map((item) => (
          <MenuItem
            as={Link}
            to={item.path}
            key={item.label}
            icon={<HiOutlineCog />}
          >
            {item.label}
          </MenuItem>
        ))}
        <MenuDivider />
        <MenuItem icon={<HiOutlineLogout />} onClick={() => auth.signOut()}>
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
