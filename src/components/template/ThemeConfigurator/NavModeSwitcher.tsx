import React from "react";
import { Radio, RadioGroup } from "components/ui";
import { setNavMode } from "store/theme/themeSlice";
import { NavMode } from "../../../constants/theme.constant";
import { useAppDispatch, useAppSelector } from "store/hooks";

const NavModeSwitcher = () => {
  const navMode = useAppSelector((state) => state.theme.navMode);
  const dispatch = useAppDispatch();

  const onSetNavMode = (val: NavMode) => {
    dispatch(setNavMode(val));
  };

  return (
    <RadioGroup
      value={navMode === "themed" ? "themed" : "light"}
      onChange={(val) => onSetNavMode(val)}
    >
      <Radio value="default">Default</Radio>
      <Radio value={"themed"}>Themed</Radio>
    </RadioGroup>
  );
};

export default NavModeSwitcher;
