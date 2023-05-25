import React from "react";
import { APP_PREFIX_PATH } from "constants/route.constant";
import { USER } from "constants/roles.constant";
import { Routes } from "./types";

const appsRoute: Routes = [
  {
    key: "dataSource.list",
    path: `${APP_PREFIX_PATH}/data-source/list`,
    component: React.lazy(() => import("views/dataSource/List")),
    authority: [USER],
    meta: {
      header: "Data Source",
      headerContainer: true,
    },
  },
  {
    key: "appsAccount.settings",
    path: `${APP_PREFIX_PATH}/account/settings/:tab`,
    component: React.lazy(() => import("views/account/Settings")),
    authority: [USER],
    meta: {
      header: "Settings",
      headerContainer: true,
    },
  },
  {
    key: "appsAccount.activityLog",
    path: `${APP_PREFIX_PATH}/account/activity-log`,
    component: React.lazy(() => import("views/account/ActivityLog")),
    authority: [USER],
  },
  {
    key: "appsAccount.kycForm",
    path: `${APP_PREFIX_PATH}/account/kyc-form`,
    component: React.lazy(() => import("views/account/KycForm")),
    authority: [USER],
  },
];

export default appsRoute;
