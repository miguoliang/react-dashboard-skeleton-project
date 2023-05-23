import React from "react";
import { Avatar, Dropdown, DropdownItem } from "components/ui";
import withHeaderItem from "utils/hoc/withHeaderItem";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { HiOutlineCog, HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import { FiActivity } from "react-icons/fi";
import { useAppSelector } from "store/hooks";
import { useAuth } from "react-oidc-context";

const dropdownItemList = [
  {
    label: "Profile",
    path: "/app/account/settings/profile",
    icon: <HiOutlineUser />,
  },
  {
    label: "Account Setting",
    path: "/app/account/settings/profile",
    icon: <HiOutlineCog />,
  },
  {
    label: "Activity Log",
    path: "/app/account/activity-log",
    icon: <FiActivity />,
  },
];

export const UserDropdown = ({ className }: { className: string }) => {
  const { avatar, userName, authority, email } = useAppSelector(
    (state) => state.auth.user,
  );

  const auth = useAuth();

  const UserAvatar = (
    <div className={classNames(className, "flex items-center gap-2")}>
      <Avatar size={32} shape="circle" src={avatar} />
      <div className="hidden md:block">
        <div className="text-xs capitalize">{authority[0] || "guest"}</div>
        <div className="font-bold">{userName}</div>
      </div>
    </div>
  );

  return (
    <div>
      <Dropdown
        menuStyle={{ minWidth: 240 }}
        renderTitle={UserAvatar}
        placement="bottom-end"
      >
        <DropdownItem dropdownItemVariant="header">
          <div className="py-2 px-3 flex items-center gap-2">
            <Avatar shape="circle" src={avatar} />
            <div>
              <div className="font-bold text-gray-900 dark:text-gray-100">
                {userName}
              </div>
              <div className="text-xs">{email}</div>
            </div>
          </div>
        </DropdownItem>
        <DropdownItem dropdownItemVariant="divider" />
        {dropdownItemList.map((item) => (
          <DropdownItem eventKey={item.label} key={item.label} className="mb-1">
            <Link className="flex gap-2 items-center" to={item.path}>
              <span className="text-xl opacity-50">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </DropdownItem>
        ))}
        <DropdownItem dropdownItemVariant="divider" />
        <DropdownItem
          onClick={() => auth.signoutRedirect()}
          eventKey="Sign Out"
          className="gap-2"
        >
          <span className="text-xl opacity-50">
            <HiOutlineLogout />
          </span>
          <span>Sign Out</span>
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

export default withHeaderItem(UserDropdown);
