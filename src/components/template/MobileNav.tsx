import React, { lazy, Suspense, useState } from "react";
import classNames from "classnames";
import { Drawer } from "components/ui";
import withHeaderItem from "utils/hoc/withHeaderItem";
import { NavToggle } from "components/shared";
import navigationConfig from "configs/navigation.config";
import useResponsive from "utils/hooks/useResponsive";
import { useAuth } from "react-oidc-context";
import { useThemeStore } from "store";

const VerticalMenuContent = lazy(
  () => import("components/template/VerticalMenuContent"),
);

const MobileNavToggle = withHeaderItem(NavToggle);

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = () => {
    setIsOpen(false);
  };

  const themeStore = useThemeStore();
  const userAuthority = useAuth().user?.scopes ?? [];
  const { smaller } = useResponsive();

  const navColor = () => {
    if (themeStore.navMode === "themed") {
      return `bg-${themeStore.themeColor}-${themeStore.primaryColorLevel} side-nav-${themeStore.navMode}`;
    }
    if (themeStore.navMode === "transparent") {
      return `side-nav-${themeStore.mode}`;
    }
    return `side-nav-${themeStore.navMode}`;
  };

  return (
    <>
      {smaller.md && (
        <>
          <div className="text-2xl" onClick={openDrawer}>
            <MobileNavToggle toggled={isOpen} />
          </div>
          <Drawer
            title="Navigation"
            isOpen={isOpen}
            onClose={onDrawerClose}
            onRequestClose={onDrawerClose}
            bodyClass={classNames(navColor(), "p-0")}
            width={330}
            placement={themeStore.direction === "rtl" ? "right" : "left"}
          >
            <Suspense fallback={<></>}>
              {isOpen && (
                <VerticalMenuContent
                  navMode={themeStore.navMode}
                  collapsed={themeStore.sideNavCollapse}
                  navigationTree={navigationConfig}
                  routeKey={themeStore.currentRouteKey}
                  userAuthority={userAuthority}
                  onMenuItemClick={onDrawerClose}
                  direction={themeStore.direction}
                />
              )}
            </Suspense>
          </Drawer>
        </>
      )}
    </>
  );
};

export default MobileNav;
