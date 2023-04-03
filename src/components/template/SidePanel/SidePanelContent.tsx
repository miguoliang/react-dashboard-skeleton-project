import React, { ComponentProps } from "react";
import ThemeConfigurator from "components/template/ThemeConfigurator";

const SidePanelContent = (props: ComponentProps<typeof ThemeConfigurator>) => {
  return <ThemeConfigurator {...props} />;
};

export default SidePanelContent;
