import { USER_SCOPE } from "./oidc.config";
import { Icon } from "@chakra-ui/react";
import {
  HiOutlineComputerDesktop,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi";

export type NavigationMenuItem = {
  key: string;
  path?: string;
  title: string;
  translateKey?: string;
  icon?: React.ReactElement;
  type: "item" | "title" | "collapse";
  authority: string[];
  children?: NavigationMenuItem[];
  parentKey?: string;
};

const navigationMenu: NavigationMenuItem[] = [
  {
    key: "apps",
    title: "APPS",
    type: "title",
    authority: [USER_SCOPE],
  },
  {
    key: "dashboard",
    path: "/dashboard",
    title: "Dashboard",
    icon: <Icon as={HiOutlineComputerDesktop} />,
    type: "item",
    authority: [USER_SCOPE],
  },
  {
    key: "persons",
    title: "Persons",
    icon: <Icon as={HiOutlineUsers} />,
    type: "collapse",
    authority: [USER_SCOPE],
    children: [
      {
        key: "persons.list",
        path: "/dashboard/persons",
        title: "List",
        type: "item",
        authority: [USER_SCOPE],
        parentKey: "persons",
      },
    ],
  },
  {
    key: "root",
    title: "Root",
    icon: <Icon as={HiOutlineWrenchScrewdriver} />,
    type: "collapse",
    authority: [USER_SCOPE],
    children: [
      {
        key: "root.child",
        path: "/dashboard/root",
        title: "Child",
        type: "collapse",
        authority: [USER_SCOPE],
        parentKey: "root",
        children: [
          {
            key: "root.child.grandchild",
            path: "/dashboard/root",
            title: "Grandchild",
            type: "item",
            authority: [USER_SCOPE],
            parentKey: "root.child",
          },
        ],
      },
    ],
  },
];

export const findExpandedKeys = (
  start: NavigationMenuItem,
  key: string,
): string[] => {
  if (start.key === key) {
    return [start.key];
  } else if (start.type === "collapse") {
    for (const item of start.children ?? []) {
      const expandedKeys = findExpandedKeys(item, key);
      if (expandedKeys.length > 0) {
        return [start.key, ...expandedKeys];
      }
    }
  }
  return [];
};

export default navigationMenu;
