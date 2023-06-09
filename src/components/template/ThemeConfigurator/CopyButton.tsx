import React from "react";
import { Button, Notification, toast } from "components/ui";
import { useThemeStore } from "../../../store";

const CopyButton = () => {
  const themeStore = useThemeStore();

  const handleCopy = async () => {
    const config = {
      ...themeStore,
      layout: {
        type: themeStore.layout,
        sideNavCollapse: themeStore.sideNavCollapse,
      },
      panelExpand: false,
    };

    await navigator.clipboard.writeText(JSON.stringify(config, null, 2));

    toast.push(
      <Notification title="Copy Success" type="success">
        Please replace themeConfig in 'src/configs/themeConfig.js'
      </Notification>,
      {
        placement: "top-center",
      },
    );
  };

  return (
    <Button block variant="solid" onClick={handleCopy}>
      Copy config
    </Button>
  );
};

export default CopyButton;
