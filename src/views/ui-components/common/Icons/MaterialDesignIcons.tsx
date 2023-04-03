import React from "react";
import { IconWrapper } from ".";
import {
  MdOutlineChildFriendly,
  MdOutlineEdit,
  MdOutlineFaceRetouchingNatural,
  MdOutlineNotificationAdd,
  MdOutlinePark,
  MdOutlinePedalBike,
  MdOutlineSailing,
  MdOutlineSoap,
  MdOutlineVpnLock,
} from "react-icons/md";

const renderIcon = [
  { render: () => <MdOutlinePedalBike /> },
  { render: () => <MdOutlinePark /> },
  { render: () => <MdOutlineSailing /> },
  { render: () => <MdOutlineVpnLock /> },
  { render: () => <MdOutlineChildFriendly /> },
  { render: () => <MdOutlineSoap /> },
  { render: () => <MdOutlineNotificationAdd /> },
  { render: () => <MdOutlineFaceRetouchingNatural /> },
  { render: () => <MdOutlineEdit /> },
];

const MaterialDesignIcons = () => {
  return (
    <div className="grid grid-cols-3 gap-y-6 text-4xl text-center heading-text">
      {renderIcon.map((icon, index) => (
        <IconWrapper key={`materialDesignIcons-${index}`}>
          {icon.render()}
        </IconWrapper>
      ))}
    </div>
  );
};

export default MaterialDesignIcons;
