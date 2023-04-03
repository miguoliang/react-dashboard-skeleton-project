import React from "react";
import { Button, Dropdown, DropdownItem } from "components/ui";

const CustomToggle = () => {
  const Toggle = <Button>Toggle as Button</Button>;

  return (
    <div>
      <Dropdown renderTitle={Toggle}>
        <DropdownItem eventKey="a">Item A</DropdownItem>
        <DropdownItem eventKey="b">Item B</DropdownItem>
        <DropdownItem eventKey="c">Item C</DropdownItem>
        <DropdownItem eventKey="d">Item D</DropdownItem>
      </Dropdown>
    </div>
  );
};

export default CustomToggle;
