import React, { useState } from "react";
import { Menu, MenuCollapse, MenuItem } from "components/ui";

const DefaultActive = () => {
  const [defaultActiveKey] = useState(["item-2", "item-3-2"]);

  return (
    <div className="border rounded-md p-2" style={{ maxWidth: 250 }}>
      <Menu defaultActiveKeys={defaultActiveKey}>
        <MenuItem eventKey="item-1">Item 1</MenuItem>
        <MenuItem eventKey="item-2">Item 2</MenuItem>
        <MenuCollapse eventKey="item-3" label="Item 3">
          <MenuItem eventKey="item-3-1">Item 3.1</MenuItem>
          <MenuItem eventKey="item-3-2">Item 3.2</MenuItem>
        </MenuCollapse>
      </Menu>
    </div>
  );
};

export default DefaultActive;
