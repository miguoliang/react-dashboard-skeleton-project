import React from "react";
import { Dropdown, DropdownItem } from "components/ui";

const Disabled = () => {
  return (
    <div>
      <Dropdown disabled title="Click Me!">
        <DropdownItem>Item A</DropdownItem>
        <DropdownItem>Item B</DropdownItem>
        <DropdownItem>Item C</DropdownItem>
        <DropdownItem>Item D</DropdownItem>
      </Dropdown>
      <Dropdown title="Click Me!">
        <DropdownItem>Item A</DropdownItem>
        <DropdownItem disabled>Item B</DropdownItem>
        <DropdownItem>Item C</DropdownItem>
        <DropdownItem>Item D</DropdownItem>
      </Dropdown>
    </div>
  );
};

export default Disabled;
