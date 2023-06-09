import React from "react";
import { Radio, RadioGroup } from "components/ui";
import { NavMode } from "constants/theme.constant";
import { useThemeStore } from "store";

const NavModeSwitcher = () => {
  const themeStore = useThemeStore();
  const onSetNavMode = (val: NavMode) => {
    themeStore.setNavMode(val);
  };

  return (
    <RadioGroup
      value={themeStore.navMode === "themed" ? "themed" : "light"}
      onChange={(val) => onSetNavMode(val)}
    >
      <Radio value="default">Default</Radio>
      <Radio value={"themed"}>Themed</Radio>
    </RadioGroup>
  );
};

export default NavModeSwitcher;
