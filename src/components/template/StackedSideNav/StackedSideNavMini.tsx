import React, { useEffect } from "react";
import Logo from "components/template/Logo";
import { Menu, MenuItem, ScrollBar } from "components/ui";
import { NavMode, SIDE_NAV_CONTENT_GUTTER } from "constants/theme.constant";
import { NAV_ITEM_TYPE_ITEM } from "constants/navigation.constant";
import { AuthorityCheck } from "components/shared";
import navigationConfig from "configs/navigation.config";
import navigationIcon from "configs/navigation-icon.config";
import useMenuActive from "utils/hooks/useMenuActive";
import isEmpty from "lodash/isEmpty";
import { Link } from "react-router-dom";
import { NavigationTree } from "../../../configs/navigation.config/apps.navigation.config";

const StackedSideNavMini = (props: {
  navMode: NavMode;
  onChange: (data: NavigationTree) => void;
  routeKey: string;
  activeKeys?: string[];
  onSetActiveKey: (keys: string[]) => void;
  userAuthority?: string[];
  mode?: "dark" | "light";
  direction?: "ltr" | "rtl";
  className?: string;
  style?: React.CSSProperties;
}) => {
  const {
    navMode,
    onChange,
    routeKey,
    activeKeys,
    onSetActiveKey,
    userAuthority,
    mode,
    direction,
    ...rest
  } = props;

  const { includedRouteTree } = useMenuActive(navigationConfig, routeKey);

  const logoMode = () => {
    if (navMode === "themed") {
      return "dark";
    }

    if (navMode === "transparent") {
      return mode;
    }

    return navMode;
  };

  const handleMenuItemSelect = (nav: NavigationTree) => {
    onChange(nav);
    onSetActiveKey([nav.key]);
  };

  const handleLinkMenuItemSelect = (nav: NavigationTree) => {
    onChange(nav);
    onSetActiveKey([nav.key]);
  };

  useEffect(
    () => {
      if (
        includedRouteTree?.type !== NAV_ITEM_TYPE_ITEM &&
        !isEmpty(includedRouteTree)
      ) {
        onChange(includedRouteTree);
      }
    },
    includedRouteTree ? [includedRouteTree.key] : [],
  );

  return (
    <div {...rest}>
      <Logo
        mode={logoMode()}
        type="streamline"
        gutter={SIDE_NAV_CONTENT_GUTTER}
      />
      <ScrollBar autoHide direction={direction}>
        <Menu
          className="px-4 pb-4"
          variant={navMode}
          defaultActiveKeys={
            activeKeys || (includedRouteTree ? [includedRouteTree.key] : [])
          }
        >
          {navigationConfig.map((nav) => (
            <AuthorityCheck
              key={nav.key}
              authority={nav.authority}
              userAuthority={userAuthority}
            >
              {nav.subMenu.length > 0 ? (
                <MenuItem
                  eventKey={nav.key}
                  className="mb-2"
                  onSelect={() => handleMenuItemSelect(nav)}
                >
                  <div className="text-2xl">{navigationIcon[nav.icon]}</div>
                </MenuItem>
              ) : (
                <Link
                  to={nav.path}
                  className="flex items-center h-full w-full"
                  onClick={() => handleLinkMenuItemSelect(nav)}
                >
                  <MenuItem eventKey={nav.key} className="mb-2">
                    <div className="text-2xl">{navigationIcon[nav.icon]}</div>
                  </MenuItem>
                </Link>
              )}
            </AuthorityCheck>
          ))}
        </Menu>
      </ScrollBar>
    </div>
  );
};

export default StackedSideNavMini;
