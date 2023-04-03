import React, { useState } from "react";
import { Menu, MenuItem, Radio, RadioGroup } from "components/ui";

const Variants = () => {
  const [variant, setVariant] = useState<
    "light" | "dark" | "themed" | "transparent"
  >("light");

  const handleChange = (value: any) => {
    setVariant(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup value={variant} name="menuVariants" onChange={handleChange}>
        <Radio value={"light"}>Light</Radio>
        <Radio value={"dark"}>Dark</Radio>
        <Radio value={"themed"}>Themed</Radio>
        <Radio value={"transparent"}>Transparent</Radio>
      </RadioGroup>
      <Menu
        variant={variant}
        className="border rounded-md p-2"
        style={{ maxWidth: 250 }}
      >
        <MenuItem eventKey="settings">Settings</MenuItem>
        <MenuItem eventKey="message">Message</MenuItem>
        <MenuItem eventKey="gallery">Gallery</MenuItem>
      </Menu>
    </div>
  );
};

export default Variants;
