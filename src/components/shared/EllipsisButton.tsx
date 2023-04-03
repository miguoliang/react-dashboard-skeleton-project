import React from "react";
import { Button } from "components/ui";
import { VscEllipsis } from "react-icons/vsc";

type EllipsisButtonProps = React.ComponentProps<typeof Button>;

const EllipsisButton = (props: EllipsisButtonProps) => {
  const { shape = "circle", variant = "plain", size = "xs" } = props;

  return (
    <Button
      shape={shape}
      variant={variant}
      size={size}
      icon={<VscEllipsis />}
      {...props}
    />
  );
};

export default EllipsisButton;
