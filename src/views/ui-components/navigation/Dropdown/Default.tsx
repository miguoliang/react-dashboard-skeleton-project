import React, { MouseEventHandler } from "react";
import { Dropdown, DropdownItem } from "components/ui";
import { MenuItemSelectEventHandler } from "../../../../components/ui/MenuItem";

const Default = () => {
  const dropdownItems = [
    { key: "a", name: "Item A" },
    { key: "b", name: "Item B" },
    { key: "c", name: "Item C" },
    { key: "d", name: "Item D" },
  ];

  const onDropdownItemClick: MenuItemSelectEventHandler = (eventKey, e) => {
    console.log("Dropdown Item Clicked", eventKey, e);
  };

  const onDropdownClick: MouseEventHandler = (e) => {
    console.log("Dropdown Clicked", e);
  };

  return (
    <div>
      <Dropdown title="Click Me!" onClick={onDropdownClick}>
        {dropdownItems.map((item) => (
          <DropdownItem
            onSelect={onDropdownItemClick}
            eventKey={item.key}
            key={item.key}
          >
            {item.name}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
};

export default Default;
