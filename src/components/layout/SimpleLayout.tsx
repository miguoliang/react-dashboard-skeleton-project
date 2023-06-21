import React from "react";
import UserDropdown from "components/template/UserMenu";
import LanguageSelector from "components/template/LanguageSelector";
import MobileNav from "components/template/MobileNav";
import View from "views";
import { SignInAndSignUp } from "./ModernLayout";
import { useAuth } from "../../hooks/useAuth";
import { Box, Container, Flex, HStack, Image, Spacer } from "@chakra-ui/react";

const HeaderActionsStart = () => {
  return (
    <>
      <Image src="/img/logo/logo-light-full.png" />
      <MobileNav />
    </>
  );
};

const HeaderActionsEnd = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  return (
    <HStack spacing={2}>
      <LanguageSelector />
      {isAuthenticated ? (
        <UserDropdown hoverable={false} />
      ) : (
        <SignInAndSignUp />
      )}
    </HStack>
  );
};

const SimpleLayout = () => {
  return (
    <Box>
      <Box
        as="header"
        boxShadow={"md"}
        className={"sticky"}
        top={0}
        bg={"white"}
      >
        <Container maxW={"9xl"}>
          <Flex>
            <HeaderActionsStart />
            <Spacer />
            <HeaderActionsEnd />
          </Flex>
        </Container>
      </Box>
      <Box bg={"gray.100"}>
        <Container maxW={"9xl"} py={6} px={8}>
          <View />
        </Container>
      </Box>
    </Box>
  );
};

export default SimpleLayout;
