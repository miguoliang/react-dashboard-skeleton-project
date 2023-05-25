import React from "react";
import HorizontalMenuContent from "./HorizontalMenuContent";
import useResponsive from "utils/hooks/useResponsive";
import { useAppSelector } from "store/hooks";
import { useAuth } from "react-oidc-context";

const HorizontalNav = () => {
  const mode = useAppSelector((state) => state.theme.mode);
  const userAuthority = useAuth().user?.scopes ?? [];

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
