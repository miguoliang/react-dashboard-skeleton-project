import React, { useState } from "react";
import {
  SPLITTED_SIDE_NAV_MINI_WIDTH,
  SPLITTED_SIDE_NAV_SECONDARY_WIDTH,
} from "constants/theme.constant";
import StackedSideNavMini from "./StackedSideNavMini";
import StackedSideNavSecondary from "./StackedSideNavSecondary";
import useResponsive from "utils/hooks/useResponsive";
import isEmpty from "lodash/isEmpty";
import { useTranslation } from "react-i18next";
import { NavigationTree } from "configs/navigation.config/apps.navigation.config";
import { useAuth } from "react-oidc-context";
import { useThemeStore } from "store";

const stackedSideNavDefaultStyle = {
  width: SPLITTED_SIDE_NAV_MINI_WIDTH,
};

const StackedSideNav = () => {
  const { t } = useTranslation();
  const [selectedMenu, setSelectedMenu] = useState<NavigationTree>();
  const [activeKeys, setActiveKeys] = useState<string[]>();
  const themeStore = useThemeStore();
  const userAuthority = useAuth().user?.scopes ?? [];
  const { larger } = useResponsive();

  const navColor = (navType: string, mode: string, ableTheme = true) => {
    if (themeStore.navMode === "themed" && ableTheme) {
      return `bg-${themeStore.themeColor}-${themeStore.primaryColorLevel} ${navType}-${mode}`;
    }
    return `${navType}-${mode}`;
  };

  const handleChange = (selected: NavigationTree) => {
    setSelectedMenu(selected);
  };

  const handleCollapse = () => {
    setSelectedMenu(undefined);
    setActiveKeys([]);
  };

  const handleSetActiveKey = (key: string[]) => {
    setActiveKeys(key);
  };

  const stackedSideNavSecondaryDirStyle = () => {
    let style = {};
    const marginValue = `${-SPLITTED_SIDE_NAV_SECONDARY_WIDTH}px`;
    if (themeStore.direction === "ltr") {
      style = { marginLeft: marginValue };
    }

    if (themeStore.direction === "rtl") {
      style = { marginRight: marginValue };
    }

    return style;
  };

  return (
    <>
      {larger.md && (
        <div className={`stacked-side-nav`}>
          <StackedSideNavMini
            className={`stacked-side-nav-mini ${navColor(
              "stacked-side-nav-mini",
              themeStore.navMode,
            )}`}
            style={stackedSideNavDefaultStyle}
            routeKey={themeStore.currentRouteKey}
            activeKeys={activeKeys}
            navMode={themeStore.navMode}
            onChange={handleChange}
            onSetActiveKey={handleSetActiveKey}
            userAuthority={userAuthority}
            mode={themeStore.mode}
            direction={themeStore.direction}
          />
          <div
            className={`stacked-side-nav-secondary ${navColor(
              "stacked-side-nav-secondary",
              themeStore.mode,
              false,
            )}`}
            style={{
              width: SPLITTED_SIDE_NAV_SECONDARY_WIDTH,
              ...(isEmpty(selectedMenu)
                ? stackedSideNavSecondaryDirStyle()
                : {}),
            }}
          >
            {!isEmpty(selectedMenu) && (
              <StackedSideNavSecondary
                title={t(selectedMenu.translateKey, selectedMenu.title)}
                menu={selectedMenu.menu}
                routeKey={themeStore.currentRouteKey}
                navMode={"transparent"}
                onCollapse={handleCollapse}
                direction={themeStore.direction}
                userAuthority={userAuthority}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StackedSideNav;
