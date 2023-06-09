import React from "react";
import classNames from "classnames";
import { Drawer } from "components/ui";
import { HiOutlineCog } from "react-icons/hi";
import SidePanelContent from "./SidePanelContent";
import withHeaderItem from "utils/hoc/withHeaderItem";
import { useThemeStore } from "../../../store";

export const SidePanel = (props: JSX.IntrinsicElements["div"]) => {
  const { className, ...rest } = props;
  const themeStore = useThemeStore();
  const openPanel = () => {
    themeStore.setPanelExpand(true);
  };

  const closePanel = () => {
    themeStore.setPanelExpand(false);
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
        isOpen={themeStore.panelExpand}
        onClose={closePanel}
        onRequestClose={closePanel}
        placement={themeStore.direction === "rtl" ? "left" : "right"}
        width={375}
      >
        <SidePanelContent callBackClose={closePanel} />
      </Drawer>
    </>
  );
};

export default withHeaderItem(SidePanel);
