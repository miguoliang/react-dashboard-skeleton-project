import React, { MouseEventHandler, useState } from "react";
import { Button, Drawer } from "components/ui";

const Closable = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose: MouseEventHandler = (e) => {
    console.log("onDrawerClose", e);
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={() => openDrawer()}>Open Drawer</Button>
      <Drawer
        title="Drawer Title"
        isOpen={isOpen}
        onClose={onDrawerClose}
        closable={false}
        onRequestClose={onDrawerClose}
      >
        Drawer Content
      </Drawer>
    </div>
  );
};

export default Closable;
