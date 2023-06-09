import { ThemeMode } from "constants/theme.constant";
import { useEffect } from "react";
import { useThemeStore } from "../../store";

function useDarkMode(): [boolean, (mode: ThemeMode) => void] {
  const mode = useThemeStore((state) => state.mode);
  const isEnabled = mode === "dark";
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(isEnabled ? "light" : "dark");
    root.classList.add(isEnabled ? "dark" : "light");
  }, [isEnabled]);
  return [isEnabled, useThemeStore((state) => state.setMode)];
}

export default useDarkMode;
