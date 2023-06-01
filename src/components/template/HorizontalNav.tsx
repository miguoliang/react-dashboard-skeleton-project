import React from "react";
import HorizontalMenuContent from "./HorizontalMenuContent";
import useResponsive from "utils/hooks/useResponsive";

const HorizontalNav = () => {
  const { larger } = useResponsive();

  return <>{larger.md && <HorizontalMenuContent />}</>;
};

export default HorizontalNav;
