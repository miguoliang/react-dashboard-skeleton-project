import { APP_PREFIX_PATH } from "constants/route.constant";
import {
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
  NAV_ITEM_TYPE_TITLE,
} from "constants/navigation.constant";
import { ADMIN, USER } from "constants/roles.constant";

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
    authority: [ADMIN, USER],
    subMenu: [
      {
        key: "dataSource",
        path: `${APP_PREFIX_PATH}/data-source/list`,
        title: "Data Source",
        translateKey: "nav.appsProject.dataSource",
        icon: "project",
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      {
        key: "apps.account",
        path: "",
        title: "Account",
        translateKey: "nav.appsAccount.account",
        icon: "account",
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [ADMIN, USER],
        subMenu: [
          {
            key: "appsAccount.settings",
            path: `${APP_PREFIX_PATH}/account/settings/profile`,
            title: "Settings",
            translateKey: "nav.appsAccount.settings",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [ADMIN, USER],
            subMenu: [],
          },
          {
            key: "appsAccount.invoice",
            path: `${APP_PREFIX_PATH}/account/invoice/36223`,
            title: "Invoice",
            translateKey: "nav.appsAccount.invoice",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [ADMIN, USER],
            subMenu: [],
          },
          {
            key: "appsAccount.activityLog",
            path: `${APP_PREFIX_PATH}/account/activity-log`,
            title: "Activity Log",
            translateKey: "nav.appsAccount.activityLog",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [ADMIN, USER],
            subMenu: [],
          },
          {
            key: "appsAccount.kycForm",
            path: `${APP_PREFIX_PATH}/account/kyc-form`,
            title: "KYC Form",
            translateKey: "nav.appsAccount.kycForm",
            icon: "",
            type: NAV_ITEM_TYPE_ITEM,
            authority: [ADMIN, USER],
            subMenu: [],
          },
        ],
      },
    ],
  },
];

export default appsNavigationConfig;
