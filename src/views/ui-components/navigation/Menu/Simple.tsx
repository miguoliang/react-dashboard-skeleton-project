import React from "react";
import { Menu, MenuItem } from "components/ui";
import { MenuItemSelectEventHandler } from "../../../../components/ui/MenuItem";

const Simple = () => {
  const handleSelect: MenuItemSelectEventHandler = (key, e) => {
    console.log("key", key);
    console.log("event", e);
  };

  return (
    <div className="border rounded-md p-2" style={{ maxWidth: 250 }}>
      <Menu onSelect={handleSelect}>
        <MenuItem eventKey="settings">Settings</MenuItem>
        <MenuItem eventKey="message">Message</MenuItem>
        <MenuItem eventKey="gallery">Gallery</MenuItem>
      </Menu>
    </div>
  );
};

export default Simple;
