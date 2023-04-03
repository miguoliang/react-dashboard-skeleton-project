import React from "react";
import classNames from "classnames";
import { Drawer } from "components/ui";
import { HiOutlineCog } from "react-icons/hi";
import SidePanelContent from "./SidePanelContent";
import withHeaderItem from "utils/hoc/withHeaderItem";
import { setPanelExpand } from "store/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

export const SidePanel = (props: JSX.IntrinsicElements["div"]) => {
  const dispatch = useAppDispatch();

  const { className, ...rest } = props;

  const panelExpand = useAppSelector((state) => state.theme.panelExpand);

  const direction = useAppSelector((state) => state.theme.direction);

  const openPanel = () => {
    dispatch(setPanelExpand(true));
  };

  const closePanel = () => {
    dispatch(setPanelExpand(false));
    const bodyClassList = document.body.classList;
    if (bodyClassList.contains("drawer-lock-scroll")) {
      bodyClassList.remove("drawer-lock-scroll", "drawer-open");
    }
  };

  return (
    <>
      <div
        className={classNames("text-2xl", className)}
        onClick={openPanel}
        {...rest}
      >
        <HiOutlineCog />
      </div>
      <Drawer
        title="Theme Config"
        isOpen={panelExpand}
        onClose={closePanel}
        onRequestClose={closePanel}
        placement={direction === "rtl" ? "left" : "right"}
        width={375}
      >
        <SidePanelContent callBackClose={closePanel} />
      </Drawer>
    </>
  );
};

export default withHeaderItem(SidePanel);
