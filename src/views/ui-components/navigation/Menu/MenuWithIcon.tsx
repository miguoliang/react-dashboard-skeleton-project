import React, { ReactNode } from "react";
import { Menu, MenuCollapse, MenuItem } from "components/ui";
import {
  HiOutlineChat,
  HiOutlineCog,
  HiOutlineGlobeAlt,
  HiOutlineSupport,
  HiWifi,
} from "react-icons/hi";

const MenuContent = ({ icon, label }: { icon: ReactNode; label: string }) => {
  return (
    <div className="flex items-center gap-2">
      <span className={"text-2xl"}>{icon}</span>
      <span>{label}</span>
    </div>
  );
};

const MenuWithIcon = () => {
  return (
    <div className="border rounded-md p-2" style={{ maxWidth: 250 }}>
      <Menu>
        <MenuItem eventKey="settings">
          <MenuContent icon={<HiOutlineCog />} label="Settings" />
        </MenuItem>
        <MenuItem eventKey="messages">
          <MenuContent icon={<HiOutlineChat />} label="Messages" />
        </MenuItem>
        <MenuCollapse
          eventKey="others"
          label={<MenuContent icon={<HiOutlineGlobeAlt />} label="Network" />}
        >
          <MenuItem eventKey="wifi">
            <MenuContent icon={<HiWifi />} label="Wifi" />
          </MenuItem>
          <MenuItem eventKey="support">
            <MenuContent icon={<HiOutlineSupport />} label="Support" />
          </MenuItem>
        </MenuCollapse>
      </Menu>
    </div>
  );
};

export default MenuWithIcon;
