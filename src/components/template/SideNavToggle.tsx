import React from "react";
import withHeaderItem from "utils/hoc/withHeaderItem";
import useResponsive from "hooks/useResponsive";
import { NavToggle } from "components/shared";
import { useSideNav } from "../../hooks/useSideNav";

export const SideNavToggle = ({ className }: { className: string }) => {
  const sideNav = useSideNav();
  const { larger } = useResponsive();
  return (
    <>
      {larger.md && (
        <div
          className={className}
          onClick={() => sideNav.setCollapsed(!sideNav.collapsed)}
        >
          <NavToggle className="text-2xl" toggled={sideNav.collapsed} />
        </div>
      )}
    </>
  );
};

export default withHeaderItem(SideNavToggle);
