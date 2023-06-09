import React from "react";
import classNames from "classnames";
import { ScrollBar } from "components/ui";
import {
  LOGO_X_GUTTER,
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_CONTENT_GUTTER,
  SIDE_NAV_WIDTH,
} from "constants/theme.constant";
import Logo from "components/template/Logo";
import navigationConfig from "configs/navigation.config";
import VerticalMenuContent from "components/template/VerticalMenuContent";
import useResponsive from "utils/hooks/useResponsive";
import { useAuth } from "react-oidc-context";
import { useThemeStore } from "store";

const sideNavStyle = {
  width: SIDE_NAV_WIDTH,
  minWidth: SIDE_NAV_WIDTH,
};

const sideNavCollapseStyle = {
  width: SIDE_NAV_COLLAPSED_WIDTH,
  minWidth: SIDE_NAV_COLLAPSED_WIDTH,
};

const SideNav = () => {
  const themeStore = useThemeStore();
  const userAuthority = useAuth().user?.scopes ?? [];
  const { larger } = useResponsive();
  const sideNavColor = () => {
    if (themeStore.navMode === "themed") {
      return `bg-${themeStore.themeColor}-${themeStore.primaryColorLevel} side-nav-${themeStore.navMode}`;
    }
    return `side-nav-${themeStore.navMode}`;
  };

  const logoMode = () => {
    if (themeStore.navMode === "themed") {
      return "dark";
    }

    if (themeStore.navMode === "transparent") {
      return themeStore.mode;
    }

    return themeStore.navMode;
  };

  const menuContent = (
    <VerticalMenuContent
      navMode={themeStore.navMode}
      collapsed={themeStore.sideNavCollapse}
      navigationTree={navigationConfig}
      routeKey={themeStore.currentRouteKey}
      userAuthority={userAuthority}
      direction={themeStore.direction}
    />
  );

  return (
    <>
      {larger.md && (
        <div
          style={
            themeStore.sideNavCollapse ? sideNavCollapseStyle : sideNavStyle
          }
          className={classNames(
            "side-nav",
            sideNavColor(),
            !themeStore.sideNavCollapse && "side-nav-expand",
          )}
        >
          <div className="side-nav-header">
            <Logo
              mode={logoMode()}
              type={themeStore.sideNavCollapse ? "streamline" : "full"}
              gutter={
                themeStore.sideNavCollapse
                  ? SIDE_NAV_CONTENT_GUTTER
                  : LOGO_X_GUTTER
              }
            />
          </div>
          {themeStore.sideNavCollapse ? (
            menuContent
          ) : (
            <div className="side-nav-content">
              <ScrollBar autoHide direction={themeStore.direction}>
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
