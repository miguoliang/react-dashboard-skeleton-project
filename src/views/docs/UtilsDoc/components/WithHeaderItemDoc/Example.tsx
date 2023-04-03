import React from "react";
import classNames from "classnames";
import withHeaderItem from "utils/hoc/withHeaderItem";
import { Dropdown, DropdownItem } from "components/ui";
import { HiOutlineSearch } from "react-icons/hi";

const Example = ({ className }: { className?: string }) => {
  return (
    <Dropdown
      renderTitle={
        <HiOutlineSearch className={classNames(className, "text-4xl")} />
      }
    >
      <DropdownItem eventKey="a">Item A</DropdownItem>
      <DropdownItem eventKey="b">Item B</DropdownItem>
      <DropdownItem eventKey="c">Item C</DropdownItem>
      <DropdownItem eventKey="d">Item D</DropdownItem>
    </Dropdown>
  );
};

export default withHeaderItem(Example);
