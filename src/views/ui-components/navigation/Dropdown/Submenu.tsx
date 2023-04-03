import React from "react";
import { Dropdown, DropdownItem, DropdownMenu } from "components/ui";

const Submenu = () => {
  return (
    <Dropdown title="Click Me!">
      <DropdownItem>Item 1</DropdownItem>
      <DropdownMenu title="Right Item 2">
        <DropdownMenu title="Item 2-1">
          <DropdownItem active>Item 2-1-1</DropdownItem>
          <DropdownItem>Item 2-1-2</DropdownItem>
          <DropdownItem>Item 2-1-3</DropdownItem>
        </DropdownMenu>
        <DropdownItem>Item 2-2</DropdownItem>
        <DropdownItem>Item 2-3</DropdownItem>
      </DropdownMenu>
      <DropdownMenu title="Right Item 3">
        <DropdownMenu title="Item 3-1">
          <DropdownItem>Item 3-1-1</DropdownItem>
          <DropdownItem>Item 3-1-2</DropdownItem>
          <DropdownItem>Item 3-1-3</DropdownItem>
        </DropdownMenu>
        <DropdownItem>Item 3-2</DropdownItem>
        <DropdownItem>Item 3-3</DropdownItem>
      </DropdownMenu>
      <DropdownItem>Item 4</DropdownItem>
    </Dropdown>
  );
};

export default Submenu;
