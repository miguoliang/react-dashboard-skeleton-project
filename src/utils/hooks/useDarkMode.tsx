import { ThemeMode } from "constants/theme.constant";
import { useEffect } from "react";
import { setMode } from "store/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

function useDarkMode(): [boolean, (mode: ThemeMode) => void] {
  const mode = useAppSelector((state) => state.theme.mode);

  const isEnabled = mode === "dark";

  const dispatch = useAppDispatch();
  const onModeChange = (mode: ThemeMode) => dispatch(setMode(mode));

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(isEnabled ? "light" : "dark");
    root.classList.add(isEnabled ? "dark" : "light");
  }, [isEnabled]);

  return [isEnabled, onModeChange];
}

export default useDarkMode;
