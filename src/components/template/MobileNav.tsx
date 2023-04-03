import React, { lazy, Suspense, useState } from "react";
import classNames from "classnames";
import { Drawer } from "components/ui";
import withHeaderItem from "utils/hoc/withHeaderItem";
import { NavToggle } from "components/shared";
import navigationConfig from "configs/navigation.config";
import useResponsive from "utils/hooks/useResponsive";
import { useAppSelector } from "store/hooks";

const VerticalMenuContent = lazy(
  () => import("components/template/VerticalMenuContent")
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

  const themeColor = useAppSelector((state) => state.theme.themeColor);
  const primaryColorLevel = useAppSelector(
    (state) => state.theme.primaryColorLevel
  );
  const navMode = useAppSelector((state) => state.theme.navMode);
  const mode = useAppSelector((state) => state.theme.mode);
  const direction = useAppSelector((state) => state.theme.direction);
  const currentRouteKey = useAppSelector(
    (state) => state.base.common.currentRouteKey
  );
  const sideNavCollapse = useAppSelector(
    (state) => state.theme.layout.sideNavCollapse
  );
  const userAuthority = useAppSelector((state) => state.auth.user.authority);

  const { smaller } = useResponsive();

  const navColor = () => {
    if (navMode === "themed") {
      return `bg-${themeColor}-${primaryColorLevel} side-nav-${navMode}`;
    }

    if (navMode === "transparent") {
      return `side-nav-${mode}`;
    }

    return `side-nav-${navMode}`;
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
            placement={direction === "rtl" ? "right" : "left"}
          >
            <Suspense fallback={<></>}>
              {isOpen && (
                <VerticalMenuContent
                  navMode={navMode}
                  collapsed={sideNavCollapse}
                  navigationTree={navigationConfig}
                  routeKey={currentRouteKey}
                  userAuthority={userAuthority}
                  onMenuItemClick={onDrawerClose}
                  direction={direction}
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
