import { APP_PREFIX_PATH } from "constants/route.constant";
import {
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_TITLE,
} from "constants/navigation.constant";
import { USER } from "constants/roles.constant";

export type NavigationTree = {
  key: string;
  path: string;
  title: string;
  translateKey: string;
  icon: string;
  type: string;
  authority: string[];
  subMenu: NavigationTree[];
  parentKey?: string;
} & Record<string, any>;

const appsNavigationConfig: NavigationTree[] = [
  {
    key: "apps",
    path: "",
    title: "APPS",
    translateKey: "nav.apps",
    icon: "apps",
    type: NAV_ITEM_TYPE_TITLE,
    authority: [USER],
    subMenu: [
      {
        key: "dataSource",
        path: `${APP_PREFIX_PATH}/data-source/list`,
        title: "Data Source",
        translateKey: "nav.appsProject.dataSource",
        icon: "project",
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [USER],
        subMenu: [],
      },
    ],
  },
];

export default appsNavigationConfig;
