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
  subMenu?: NavigationMenuItem[];
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
    subMenu: [
      {
        key: "persons.list",
        path: "/persons",
        title: "List",
        type: "item",
        authority: [USER_SCOPE],
      },
    ],
  },
];

export default navigationMenu;
