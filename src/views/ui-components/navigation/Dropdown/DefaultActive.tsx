import React from "react";
import { Dropdown, DropdownItem, DropdownMenu } from "components/ui";

const DefaultActive = () => {
  return (
    <div>
      <Dropdown title="Click Me!" activeKey="a">
        <DropdownItem eventKey="a">Item A</DropdownItem>
        <DropdownItem eventKey="b">Item B</DropdownItem>
        <DropdownItem eventKey="c">Item C</DropdownItem>
        <DropdownItem eventKey="d">Item D</DropdownItem>
      </Dropdown>
      <Dropdown title="Click Me!" activeKey="item-2-1-2">
        <DropdownItem eventKey="item-1">Item 1</DropdownItem>
        <DropdownMenu eventKey="item-2" title="Item 2">
          <DropdownMenu eventKey="item-2-1" title="Item 2-1">
            <DropdownItem eventKey="item-2-1-1">Item 2-1-1</DropdownItem>
            <DropdownItem eventKey="item-2-1-2">Item 2-1-2</DropdownItem>
            <DropdownItem eventKey="item-2-1-3">Item 2-1-3</DropdownItem>
          </DropdownMenu>
          <DropdownItem eventKey="item-2-2">Item 2-2</DropdownItem>
          <DropdownItem eventKey="item-2-3">Item 2-3</DropdownItem>
        </DropdownMenu>
        <DropdownItem>Item 3</DropdownItem>
      </Dropdown>
    </div>
  );
};

export default DefaultActive;
