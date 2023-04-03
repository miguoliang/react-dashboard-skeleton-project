import React from "react";
import { Dropdown, DropdownItem } from "components/ui";
import {
  HiOutlineCog,
  HiOutlineFlag,
  HiOutlineSwitchHorizontal,
} from "react-icons/hi";
import EllipsisButton from "components/shared/EllipsisButton";

const dropdownList = [
  { label: "Add Flag", value: "addFlag", icon: <HiOutlineFlag /> },
  { label: "Move", value: "move", icon: <HiOutlineSwitchHorizontal /> },
  { label: "Setting", value: "projectSetting", icon: <HiOutlineCog /> },
];

const ItemDropdown = () => {
  return (
    <Dropdown placement="bottom-end" renderTitle={<EllipsisButton />}>
      {dropdownList.map((item) => (
        <DropdownItem eventKey={item.value} key={item.value}>
          <span className="text-lg">{item.icon}</span>
          <span className="ml-2 rtl:mr-2">{item.label}</span>
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default ItemDropdown;
