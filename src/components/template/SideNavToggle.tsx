import React from "react";
import withHeaderItem from "utils/hoc/withHeaderItem";
import useResponsive from "utils/hooks/useResponsive";
import { NavToggle } from "components/shared";
import { useThemeStore } from "../../store";

export const SideNavToggle = ({ className }: { className: string }) => {
  const themeStore = useThemeStore();
  const sideNavCollapse = themeStore.sideNavCollapse;
  const { larger } = useResponsive();
  const onCollapse = () => {
    themeStore.setSideNavCollapse(!sideNavCollapse);
  };
  return (
    <>
      {larger.md && (
        <div className={className} onClick={onCollapse}>
          <NavToggle className="text-2xl" toggled={sideNavCollapse} />
        </div>
      )}
    </>
  );
};

export default withHeaderItem(SideNavToggle);
