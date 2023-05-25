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
import { useAppSelector } from "store/hooks";
import { NavigationTree } from "../../../configs/navigation.config/apps.navigation.config";
import { useAuth } from "react-oidc-context";

const stackedSideNavDefaultStyle = {
  width: SPLITTED_SIDE_NAV_MINI_WIDTH,
};

const StackedSideNav = () => {
  const { t } = useTranslation();

  const [selectedMenu, setSelectedMenu] = useState<NavigationTree>();
  const [activeKeys, setActiveKeys] = useState<string[]>();

  const themeColor = useAppSelector((state) => state.theme.themeColor);
  const primaryColorLevel = useAppSelector(
    (state) => state.theme.primaryColorLevel,
  );
  const navMode = useAppSelector((state) => state.theme.navMode);
  const mode = useAppSelector((state) => state.theme.mode);
  const direction = useAppSelector((state) => state.theme.direction);
  const currentRouteKey = useAppSelector(
    (state) => state.base.common.currentRouteKey,
  );
  const userAuthority = useAuth().user?.scopes ?? [];

  const { larger } = useResponsive();

  const navColor = (navType: string, mode: string, ableTheme = true) => {
    if (navMode === "themed" && ableTheme) {
      return `bg-${themeColor}-${primaryColorLevel} ${navType}-${mode}`;
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
    if (direction === "ltr") {
      style = { marginLeft: marginValue };
    }

    if (direction === "rtl") {
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
              navMode,
            )}`}
            style={stackedSideNavDefaultStyle}
            routeKey={currentRouteKey}
            activeKeys={activeKeys}
            navMode={navMode}
            onChange={handleChange}
            onSetActiveKey={handleSetActiveKey}
            userAuthority={userAuthority}
            mode={mode}
            direction={direction}
          />
          <div
            className={`stacked-side-nav-secondary ${navColor(
              "stacked-side-nav-secondary",
              mode,
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
                routeKey={currentRouteKey}
                navMode={"transparent"}
                onCollapse={handleCollapse}
                direction={direction}
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
