import React, { useEffect, useState } from "react";
import { Menu, MenuGroup, useConfig } from "components/ui";
import VerticalSingleMenuItem from "./VerticalSingleMenuItem";
import VerticalCollapsedMenuItem from "./VerticalCollapsedMenuItem";
import {
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
  NAV_ITEM_TYPE_TITLE,
} from "constants/navigation.constant";
import useMenuActive from "hooks/useMenuActive";
import { useTranslation } from "react-i18next";
import { NavMode } from "../../../constants/theme.constant";
import { TextDirection } from "../../ui/utils/constant";
import { NavigationTree } from "../../../configs/navigation.config/apps.navigation.config";

type VerticalMenuContentProps = {
  navMode: NavMode;
  collapsed?: boolean;
  routeKey: string;
  navigationTree: NavigationTree | NavigationTree[];
  userAuthority: string[];
  direction?: TextDirection;
  onMenuItemClick?: () => void;
};

const VerticalMenuContent = (props: VerticalMenuContentProps) => {
  const {
    navMode = useConfig().navMode,
    collapsed = true,
    routeKey,
    navigationTree = [],
    onMenuItemClick,
    direction = useConfig().direction,
  } = props;

  const { t } = useTranslation();

  const [defaultExpandKey, setDefaultExpandKey] = useState<string[]>([]);

  const { activeRoute } = useMenuActive(navigationTree, routeKey);

  useEffect(() => {
    if (defaultExpandKey.length === 0 && activeRoute?.parentKey) {
      setDefaultExpandKey([activeRoute.parentKey]);
    }
  }, [activeRoute?.parentKey]);

  const handleLinkClick = () => {
    onMenuItemClick?.();
  };

  const getNavItem = (nav: NavigationTree) => {
    if (nav.subMenu.length === 0 && nav.type === NAV_ITEM_TYPE_ITEM) {
      return (
        <VerticalSingleMenuItem
          key={nav.key}
          nav={nav}
          onLinkClick={handleLinkClick}
          sideCollapsed={collapsed}
          direction={direction}
        />
      );
    }

    if (nav.subMenu.length > 0 && nav.type === NAV_ITEM_TYPE_COLLAPSE) {
      return (
        <VerticalCollapsedMenuItem
          key={nav.key}
          nav={nav}
          onLinkClick={onMenuItemClick}
          sideCollapsed={collapsed}
          direction={direction}
        />
      );
    }

    if (nav.type === NAV_ITEM_TYPE_TITLE) {
      if (nav.subMenu.length > 0) {
        return (
          <MenuGroup key={nav.key} label={t(nav.translateKey) || nav.title}>
            {nav.subMenu.map((subNav) =>
              subNav.subMenu.length > 0 ? (
                <VerticalCollapsedMenuItem
                  key={subNav.key}
                  nav={subNav}
                  onLinkClick={onMenuItemClick}
                  sideCollapsed={collapsed}
                  direction={direction}
                />
              ) : (
                <VerticalSingleMenuItem
                  key={subNav.key}
                  nav={subNav}
                  onLinkClick={onMenuItemClick}
                  sideCollapsed={collapsed}
                  direction={direction}
                />
              ),
            )}
          </MenuGroup>
        );
      } else {
        return <MenuGroup label={nav.title} />;
      }
    }
  };

  return (
    <Menu
      className="px-4 pb-4"
      variant={navMode}
      sideCollapsed={collapsed}
      defaultActiveKeys={activeRoute?.key ? [activeRoute.key] : []}
      defaultExpandedKeys={defaultExpandKey}
    >
      {navigationTree.map((nav: NavigationTree) => getNavItem(nav))}
    </Menu>
  );
};

export default VerticalMenuContent;
