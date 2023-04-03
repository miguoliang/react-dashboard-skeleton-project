import React from "react";
import HorizontalMenuContent from "./HorizontalMenuContent";
import useResponsive from "utils/hooks/useResponsive";
import { useAppSelector } from "store/hooks";

const HorizontalNav = () => {
  const mode = useAppSelector((state) => state.theme.mode);
  const userAuthority = useAppSelector((state) => state.auth.user.authority);

  const { larger } = useResponsive();

  return (
    <>
      {larger.md && (
        <HorizontalMenuContent
          menuVariant={mode}
          userAuthority={userAuthority}
        />
      )}
    </>
  );
};

export default HorizontalNav;
