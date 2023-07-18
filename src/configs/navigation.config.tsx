import { USER_SCOPE } from "./oidc.config";
import { HiDatabase } from "react-icons/all";

export type NavigationMenuItem = {
  key: string;
  path: string;
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
    path: "",
    title: "APPS",
    icon: <HiDatabase />,
    type: "title",
    authority: [USER_SCOPE],
  },
  {
    key: "dashboard",
    path: "/dashboard",
    title: "Dashboard",
    icon: <HiDatabase />,
    type: "item",
    authority: [USER_SCOPE],
  },
  {
    key: "persons",
    path: "",
    title: "Persons",
    icon: <HiDatabase />,
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
    path: "",
    title: "Root",
    icon: <HiDatabase />,
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
