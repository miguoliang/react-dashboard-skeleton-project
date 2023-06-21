import React, { lazy, Suspense, useState } from "react";
import withHeaderItem from "utils/hoc/withHeaderItem";
import { NavToggle } from "components/shared";
import navigationConfig from "configs/navigation.config";
import useResponsive from "hooks/useResponsive";
import { Drawer, Text } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

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

  const themeStore = useTheme();
  const scopes = useAuth((state) => state.user?.scopes ?? []);
  const { smaller } = useResponsive();

  return (
    <>
      {smaller.md && (
        <>
          <div className="text-2xl" onClick={openDrawer}>
            <MobileNavToggle toggled={isOpen} />
          </div>
          <Drawer
            isOpen={isOpen}
            onClose={onDrawerClose}
            placement={themeStore.direction === "rtl" ? "right" : "left"}
          >
            <Text>Navigation</Text>
            <Suspense fallback={<></>}>
              {isOpen && (
                <VerticalMenuContent
                  navMode={themeStore.navMode}
                  collapsed={themeStore.sideNavCollapse}
                  navigationTree={navigationConfig}
                  routeKey={themeStore.currentRouteKey}
                  userAuthority={scopes}
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
