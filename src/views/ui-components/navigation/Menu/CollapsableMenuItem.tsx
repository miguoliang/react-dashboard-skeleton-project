import React from "react";
import { Menu, MenuCollapse, MenuItem } from "components/ui";
import { MenuCollapseEventHandler } from "../../../../components/ui/Menu/MenuCollapse";

const CollapsableMenuItem = () => {
  const handleToggle: MenuCollapseEventHandler = (expanded, e) => {
    console.log("expanded", expanded);
    console.log("event", e);
  };

  return (
    <div className="border rounded-md p-2" style={{ maxWidth: 250 }}>
      <Menu>
        <MenuItem eventKey="item-1">Item 1</MenuItem>
        <MenuItem eventKey="item-2">Item 2</MenuItem>
        <MenuCollapse eventKey="item-3" label="Item 3" onToggle={handleToggle}>
          <MenuItem eventKey="item-3-1">Item 3.1</MenuItem>
          <MenuItem eventKey="item-3-2">Item 3.2</MenuItem>
        </MenuCollapse>
      </Menu>
    </div>
  );
};

export default CollapsableMenuItem;
