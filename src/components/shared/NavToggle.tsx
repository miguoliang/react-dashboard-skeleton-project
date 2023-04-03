import React from "react";
import { HiOutlineMenu, HiOutlineMenuAlt2 } from "react-icons/hi";

type NavToggleProps = {
  toggled: boolean;
  className?: string;
};

const NavToggle = ({ toggled, className }: NavToggleProps) => {
  return (
    <div className={className}>
      {toggled ? <HiOutlineMenu /> : <HiOutlineMenuAlt2 />}
    </div>
  );
};

export default NavToggle;
