import React from "react";
import { Dropdown, DropdownItem } from "components/ui";

const Trigger = () => {
  return (
    <div className="flex">
      <Dropdown title="Click" className="mr-2">
        <DropdownItem eventKey="a">Active Item</DropdownItem>
        <DropdownItem eventKey="b">Item B</DropdownItem>
        <DropdownItem eventKey="c">Item C</DropdownItem>
        <DropdownItem eventKey="d">Item D</DropdownItem>
      </Dropdown>
      <Dropdown title="Hover" trigger="hover" className="mr-2">
        <DropdownItem eventKey="a">Active Item</DropdownItem>
        <DropdownItem eventKey="b">Item B</DropdownItem>
        <DropdownItem eventKey="c">Item C</DropdownItem>
        <DropdownItem eventKey="d">Item D</DropdownItem>
      </Dropdown>
      <Dropdown title="Right Click" trigger="context" className="mr-2">
        <DropdownItem eventKey="a">Active Item</DropdownItem>
        <DropdownItem eventKey="b">Item B</DropdownItem>
        <DropdownItem eventKey="c">Item C</DropdownItem>
        <DropdownItem eventKey="d">Item D</DropdownItem>
      </Dropdown>
    </div>
  );
};

export default Trigger;
