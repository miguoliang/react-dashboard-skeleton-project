import React from "react";
import { Menu, MenuItem } from "components/ui";

const DisabledMenuItem = () => {
  return (
    <div className="border rounded-md p-2" style={{ maxWidth: 250 }}>
      <Menu>
        <MenuItem eventKey="settings">Settings</MenuItem>
        <MenuItem eventKey="message" disabled>
          Message
        </MenuItem>
        <MenuItem eventKey="gallery">Gallery</MenuItem>
      </Menu>
    </div>
  );
};

export default DisabledMenuItem;
