import React, { useState } from "react";
import { Menu, MenuCollapse, MenuItem } from "components/ui";

const DefaultExpand = () => {
  const [defaultExpandKey] = useState(["item-3"]);

  return (
    <div className="border rounded-md p-2" style={{ maxWidth: 250 }}>
      <Menu defaultExpandedKeys={defaultExpandKey}>
        <MenuItem eventKey="item-1">Item 1</MenuItem>
        <MenuItem eventKey="item-2">Item 2</MenuItem>
        <MenuCollapse eventKey="item-3" label="Item 3">
          <MenuItem eventKey="item-3-1">Item 3.1</MenuItem>
          <MenuItem eventKey="item-3-2">Item 3.2</MenuItem>
        </MenuCollapse>
        <MenuCollapse eventKey="item-4" label="Item 4">
          <MenuItem eventKey="item-4-1">Item 4.1</MenuItem>
          <MenuItem eventKey="item-4-2">Item 4.2</MenuItem>
        </MenuCollapse>
      </Menu>
    </div>
  );
};

export default DefaultExpand;
