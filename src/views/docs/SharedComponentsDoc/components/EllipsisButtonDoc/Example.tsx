import React from "react";
import { Dropdown, DropdownItem } from "components/ui";
import EllipsisButton from "components/shared/EllipsisButton";

const dropdownList = [
  { label: "Add Flag", value: "addFlag" },
  { label: "Move", value: "move" },
  { label: "Setting", value: "projectSetting" },
];

const Example = () => {
  return (
    <Dropdown renderTitle={<EllipsisButton />}>
      {dropdownList.map((item) => (
        <DropdownItem eventKey={item.value} key={item.value}>
          <span>{item.label}</span>
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default Example;
