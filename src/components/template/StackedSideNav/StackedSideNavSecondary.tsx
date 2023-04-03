import React from "react";
import { Button, ScrollBar } from "components/ui";
import classNames from "classnames";
import { HEADER_HEIGHT_CLASS, NavMode } from "constants/theme.constant";
import VerticalMenuContent from "components/template/VerticalMenuContent";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import { NavigationTree } from "configs/navigation.config/apps.navigation.config";
import { TextDirection } from "../../ui/utils/constant";

const StackedSideNavSecondary = (props: {
  className?: string;
  title: string;
  menu: NavigationTree;
  routeKey: string;
  onCollapse: () => void;
  direction: TextDirection;
  userAuthority: string[];
  navMode: NavMode;
}) => {
  const {
    className,
    title,
    menu,
    routeKey,
    onCollapse,
    direction,
    userAuthority,
    navMode,
    ...rest
  } = props;

  const handleCollpase = () => {
    onCollapse();
  };

  return (
    <div className={classNames("h-full", className)} {...rest}>
      <div
        className={`${HEADER_HEIGHT_CLASS} flex items-center justify-between gap-4 pl-6 pr-4`}
      >
        <h5 className="font-bold">{title}</h5>
        <Button
          shape="circle"
          variant="plain"
          size="sm"
          icon={
            <>
              {direction === "ltr" && <HiOutlineArrowSmLeft />}
              {direction === "rtl" && <HiOutlineArrowSmRight />}
            </>
          }
          onClick={handleCollpase}
        />
      </div>
      <ScrollBar autoHide direction={direction}>
        <VerticalMenuContent
          routeKey={routeKey}
          navigationTree={menu}
          userAuthority={userAuthority}
          navMode={navMode}
        />
      </ScrollBar>
    </div>
  );
};

export default StackedSideNavSecondary;
