import React from "react";
import classNames from "classnames";
import HorizontalMenuContent from "components/template/HorizontalMenuContent";
import useResponsive from "utils/hooks/useResponsive";
import { useAppSelector } from "store/hooks";

const SecondaryHeader = (props: { className?: string; contained: boolean }) => {
  const { className, contained } = props;

  const navMode = useAppSelector((state) => state.theme.navMode);
  const themeColor = useAppSelector((state) => state.theme.themeColor);
  const primaryColorLevel = useAppSelector(
    (state) => state.theme.primaryColorLevel
  );
  const userAuthority = useAppSelector((state) => state.auth.user.authority);

  const { larger } = useResponsive();

  const headerColor = () => {
    if (navMode === "themed") {
      return `bg-${themeColor}-${primaryColorLevel} secondary-header-${navMode}`;
    }
    return `secondary-header-${navMode}`;
  };

  return (
    <>
      {larger.md && (
        <div
          className={classNames(
            "h-16 flex items-center",
            headerColor(),
            className
          )}
        >
          <div
            className={classNames(
              "flex items-center px-4",
              contained && "container mx-auto",
              headerColor()
            )}
          >
            <HorizontalMenuContent
              menuVariant={navMode}
              userAuthority={userAuthority}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SecondaryHeader;
