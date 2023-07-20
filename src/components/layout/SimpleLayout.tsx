import React from "react";
import UserMenu from "components/template/UserMenu";
import View from "views";
import { SignInAndSignUp } from "./ModernLayout";
import { useAuth } from "../../hooks/useAuth";
import {
  Box,
  Flex,
  HStack,
  HTMLChakraProps,
  Image,
  Spacer,
} from "@chakra-ui/react";

const HeaderActionsStart = () => {
  return (
    <>
      <Image src="/img/logo/logo-light-full.png" />
    </>
  );
};

const HeaderActionsEnd = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  return (
    <HStack spacing={2}>
      {isAuthenticated ? <UserMenu /> : <SignInAndSignUp />}
    </HStack>
  );
};

const SimpleLayout = ({
  maxW = "8xl",
  maxWidth = "8xl",
}: HTMLChakraProps<"header">) => {
  return (
    <>
      <Box
        as="header"
        boxShadow={"md"}
        position={"sticky"}
        top={0}
        bg={"white"}
      >
        <Flex maxW={maxW} maxWidth={maxWidth} mx={"auto"}>
          <HeaderActionsStart />
          <Spacer />
          <HeaderActionsEnd />
        </Flex>
      </Box>
      <Box bg={"gray.100"} py={6} px={8}>
        <View />
      </Box>
    </>
  );
};

export default SimpleLayout;
