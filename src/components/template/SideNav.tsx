import React from "react";
import { ScrollBar } from "components/ui";
import navigationConfig from "configs/navigation.config";
import VerticalMenuContent from "components/template/VerticalMenuContent";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { Box, Image } from "@chakra-ui/react";
import { useSideNav } from "../../hooks/useSideNav";

const SideNav = () => {
  const theme = useTheme();
  const sideNav = useSideNav();
  const scopes = useAuth((state) => state.user?.scopes ?? []);

  const menuContent = (
    <VerticalMenuContent
      navMode={theme.navMode}
      collapsed={theme.sideNavCollapse}
      navigationTree={navigationConfig}
      routeKey={theme.currentRouteKey}
      userAuthority={scopes}
      direction={theme.direction}
    />
  );

  return (
    <Box
      className={"sticky"}
      height={"100vh"}
      overflow={"hidden"}
      width={"290px"}
      borderRight={"1px"}
      borderColor={"gray.200"}
      bg={"gray.100"}
      flexShrink={0}
    >
      <Image
        src={`/img/logo/logo-light-${
          sideNav.collapsed ? "streamline" : "full"
        }.png`}
        px={6}
      />
      {sideNav.collapsed ? (
        menuContent
      ) : (
        <ScrollBar autoHide direction={theme.direction}>
          {menuContent}
        </ScrollBar>
      )}
    </Box>
  );
};

export default SideNav;
