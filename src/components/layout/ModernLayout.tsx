import React from "react";
import UserDropdown from "components/template/UserDropdown";
import LanguageSelector from "components/template/LanguageSelector";
import SideNavToggle from "components/template/SideNavToggle";
import MobileNav from "components/template/MobileNav";
import Search from "components/template/Search";
import SideNav from "components/template/SideNav";
import View from "views";
import { useAuth } from "hooks/useAuth";
import { Button, HStack, VStack } from "@chakra-ui/react";

export const SignInAndSignUp = () => {
  const auth = useAuth();
  return (
    <HStack spacing={4}>
      <Button
        rounded={"full"}
        className={"capitalize"}
        borderWidth={2}
        borderColor={"white"}
        bg={"white"}
        _hover={{ bg: "gray.100", borderColor: "gray.100" }}
        onClick={() => auth.userManager.signinRedirect()}
      >
        sign in
      </Button>
      <Button
        rounded={"full"}
        className={"capitalize"}
        borderWidth={2}
        color={"white"}
        borderColor={"purple.600"}
        bg={"purple.600"}
        _hover={{ bg: "purple.500" }}
        onClick={() => auth.signOut()}
      >
        sign up
      </Button>
    </HStack>
  );
};

const HeaderActionsStart = () => {
  return (
    <>
      <MobileNav />
      <SideNavToggle />
      <Search />
    </>
  );
};

const HeaderActionsEnd = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  return (
    <>
      <LanguageSelector />
      {isAuthenticated ? (
        <UserDropdown hoverable={false} />
      ) : (
        <SignInAndSignUp />
      )}
    </>
  );
};

const ModernLayout = (props: Record<string, any>) => {
  return (
    <HStack>
      <SideNav />
      <VStack className="min-h-screen min-w-0 relative w-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
        <HStack className="border-b border-gray-200 dark:border-gray-700">
          <HeaderActionsStart />
          <HeaderActionsEnd />
        </HStack>
        <View {...props} />
      </VStack>
    </HStack>
  );
};

export default ModernLayout;
