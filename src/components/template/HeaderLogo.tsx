import React from "react";
import Logo from "components/template/Logo";
import { useThemeStore } from "../../store";

const HeaderLogo = () => {
  const mode = useThemeStore((state) => state.mode);
  return <Logo mode={mode} className="hidden md:block" />;
};

export default HeaderLogo;
