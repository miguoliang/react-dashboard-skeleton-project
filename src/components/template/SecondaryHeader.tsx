import React from "react";
import classNames from "classnames";
import HorizontalMenuContent from "components/template/HorizontalMenuContent";
import useResponsive from "utils/hooks/useResponsive";
import { useThemeStore } from "../../store";
import { useAuth } from "../../utils/hooks/useAuth";

const SecondaryHeader = (props: { className?: string; contained: boolean }) => {
  const { className, contained } = props;
  const themeStore = useThemeStore();
  const scopes = useAuth((state) => state.user?.scopes ?? []);
  const { larger } = useResponsive();

  const headerColor = () => {
    if (themeStore.navMode === "themed") {
      return `bg-${themeStore.themeColor}-${themeStore.primaryColorLevel} secondary-header-${themeStore.navMode}`;
    }
    return `secondary-header-${themeStore.navMode}`;
  };

  return (
    <>
      {larger.md && (
        <div
          className={classNames(
            "h-16 flex items-center",
            headerColor(),
            className,
          )}
        >
          <div
            className={classNames(
              "flex items-center px-4",
              contained && "container mx-auto",
              headerColor(),
            )}
          >
            <HorizontalMenuContent
              menuVariant={themeStore.navMode}
              userAuthority={scopes}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SecondaryHeader;
