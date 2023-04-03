import React from "react";
import withHeaderItem from "utils/hoc/withHeaderItem";
import { setSideNavCollapse } from "store/theme/themeSlice";
import useResponsive from "utils/hooks/useResponsive";
import { NavToggle } from "components/shared";
import { useAppDispatch, useAppSelector } from "store/hooks";

export const SideNavToggle = ({ className }: { className: string }) => {
  const sideNavCollapse = useAppSelector(
    (state) => state.theme.layout.sideNavCollapse
  );
  const dispatch = useAppDispatch();

  const { larger } = useResponsive();

  const onCollapse = () => {
    dispatch(setSideNavCollapse(!sideNavCollapse));
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
