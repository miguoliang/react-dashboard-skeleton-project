import React, { useState } from "react";
import { SegmentItemOption } from "components/shared";
import { Segment, SegmentItem } from "components/ui";

import { HiOutlineCode, HiOutlineCube, HiOutlinePencil } from "react-icons/hi";

const roles: {
  value: string;
  label: string;
  icon: JSX.Element;
  disabled?: boolean;
}[] = [
  { value: "softwareEngineer", label: "Developer", icon: <HiOutlineCode /> },
  { value: "productManager", label: "Manager", icon: <HiOutlineCube /> },
  { value: "designer", label: "Designer", icon: <HiOutlinePencil /> },
];

const Example = () => {
  const [value, setValue] = useState([roles[0].value]);

  const handleChange = (val: any) => {
    setValue(val);
  };

  return (
    <Segment value={value} onChange={handleChange}>
      <div className="flex flex-col xl:flex-row items-center gap-4">
        {roles.map((item) => (
          <SegmentItem
            value={item.value}
            key={item.value}
            disabled={item.disabled}
          >
            {({ ref, active, onSegmentItemClick, disabled }) => {
              return (
                <SegmentItemOption
                  hoverable
                  ref={ref}
                  active={active}
                  disabled={disabled}
                  onSegmentItemClick={onSegmentItemClick}
                  className="bg-white dark:bg-gray-800 w-[250px]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <h6>{item.label}</h6>
                  </div>
                </SegmentItemOption>
              );
            }}
          </SegmentItem>
        ))}
      </div>
    </Segment>
  );
};

export default Example;
