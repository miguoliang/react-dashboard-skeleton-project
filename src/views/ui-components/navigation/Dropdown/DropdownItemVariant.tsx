import React from "react";
import { Dropdown, DropdownItem } from "components/ui";

const HeaderDivider = () => {
  return (
    <div>
      <Dropdown title="Click Me!">
        <DropdownItem dropdownItemVariant="header">
          <div className="pt-3 pb-1 px-3">
            <span>Signed in as</span>
            <div className="font-semibold mt-1 text-gray-800 dark:text-white">
              alex_g@theme_nate.com
            </div>
          </div>
        </DropdownItem>
        <DropdownItem dropdownItemVariant="divider" />
        <DropdownItem>Item A</DropdownItem>
        <DropdownItem>Item B</DropdownItem>
        <DropdownItem>Item C</DropdownItem>
        <DropdownItem>Item D</DropdownItem>
        <DropdownItem dropdownItemVariant="custom">
          <div
            className="
							cursor-pointer 
							px-3 
							py-2 
							text-indigo-600 
							font-semibold 
							hover:bg-gray-100 
							dark:hover:bg-black 
							dark:hover:bg-opacity-20
						"
          >
            Custom Dropdown Item
          </div>
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

export default HeaderDivider;
