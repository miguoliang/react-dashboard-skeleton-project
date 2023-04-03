import React, { ReactNode } from "react";
import { ConfigProvider } from "components/ui";
import useDarkMode from "utils/hooks/useDarkMode";
import { themeConfig } from "configs/theme.config";
import { useAppSelector } from "store/hooks";

const Theme = (props: { children?: ReactNode }) => {
  const theme = useAppSelector((state) => state.theme);
  const locale = useAppSelector((state) => state.locale.currentLang);
  const [isDark] = useDarkMode();

  const currentTheme = {
    ...themeConfig,
    ...theme,
    ...{ locale },
    mode: isDark ? "dark" : "light",
  };

  return <ConfigProvider value={currentTheme}>{props.children}</ConfigProvider>;
};

export default Theme;
