import React from "react";
import classNames from "classnames";
import { ScrollBar } from "components/ui";
import {
  LOGO_X_GUTTER,
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_CONTENT_GUTTER,
  SIDE_NAV_WIDTH,
} from "constants/theme.constant";
import navigationConfig from "configs/navigation.config";
import VerticalMenuContent from "components/template/VerticalMenuContent";
import useResponsive from "hooks/useResponsive";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { Image } from "@chakra-ui/react";

const sideNavStyle = {
  width: SIDE_NAV_WIDTH,
  minWidth: SIDE_NAV_WIDTH,
};

const sideNavCollapseStyle = {
  width: SIDE_NAV_COLLAPSED_WIDTH,
  minWidth: SIDE_NAV_COLLAPSED_WIDTH,
};

const SideNav = () => {
  const theme = useTheme();
  const scopes = useAuth((state) => state.user?.scopes ?? []);
  const { larger } = useResponsive();
  const sideNavColor = () => {
    if (theme.navMode === "themed") {
      return `bg-${theme.themeColor}-${theme.primaryColorLevel} side-nav-${theme.navMode}`;
    }
    return `side-nav-${theme.navMode}`;
  };

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
    <>
      {larger.md && (
        <div
          style={theme.sideNavCollapse ? sideNavCollapseStyle : sideNavStyle}
          className={classNames(
            "side-nav",
            sideNavColor(),
            !theme.sideNavCollapse && "side-nav-expand",
          )}
        >
          <div className="side-nav-header">
            <Image
              src={`/assets/img/logo-light-${
                theme.sideNavCollapse ? "streamline" : "full"
              }.png`}
              className={
                theme.sideNavCollapse ? SIDE_NAV_CONTENT_GUTTER : LOGO_X_GUTTER
              }
            />
          </div>
          {theme.sideNavCollapse ? (
            menuContent
          ) : (
            <div className="side-nav-content">
              <ScrollBar autoHide direction={theme.direction}>
                {menuContent}
              </ScrollBar>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SideNav;
