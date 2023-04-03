import React, { MouseEventHandler, useState } from "react";
import { Button, Drawer, Radio, RadioGroup } from "components/ui";
import { capitalize } from "lodash";

const Placement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState<
    "top" | "left" | "bottom" | "right"
  >("right");

  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose: MouseEventHandler = (e) => {
    console.log("onDrawerClose", e);
    setIsOpen(false);
  };

  const onPlacementChange = (val: "top" | "left" | "bottom" | "right") => {
    setPlacement(val);
  };

  return (
    <div className="flex-wrap inline-flex xl:flex items-center gap-2">
      <RadioGroup value={placement} onChange={onPlacementChange}>
        {["top", "left", "bottom", "right"].map((item) => (
          <Radio value={item} id={item} key={item}>
            {capitalize(item)}
          </Radio>
        ))}
      </RadioGroup>
      <Button onClick={() => openDrawer()}>Open Drawer</Button>
      <Drawer
        title="Drawer Title"
        isOpen={isOpen}
        onClose={onDrawerClose}
        onRequestClose={onDrawerClose}
        placement={placement}
      >
        Drawer Content
      </Drawer>
    </div>
  );
};

export default Placement;
