import React from "react";
import {
  Menu,
  MenuCollapse,
  MenuGroup as Group,
  MenuItem,
} from "components/ui";

const MenuGroup = () => {
  return (
    <div className="border rounded-md p-2" style={{ maxWidth: 250 }}>
      <Menu>
        <Group key="group-1" label="Group 1">
          <MenuItem eventKey="group-1-item-1">Item 1</MenuItem>
          <MenuItem eventKey="group-1-item-2">Item 2</MenuItem>
          <MenuCollapse eventKey="group-1-item-3" label="Item 3">
            <MenuItem eventKey="group-1-item-3-1">Item 3.1</MenuItem>
            <MenuItem eventKey="group-1-item-3-2">Item 3.2</MenuItem>
          </MenuCollapse>
        </Group>
        <Group key="group-2" label="Group 2">
          <MenuItem eventKey="group-2-item-1">Item 1</MenuItem>
          <MenuItem eventKey="group-2-item-2">Item 2</MenuItem>
        </Group>
      </Menu>
    </div>
  );
};

export default MenuGroup;
