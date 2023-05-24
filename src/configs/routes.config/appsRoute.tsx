import React from "react";
import { APP_PREFIX_PATH } from "constants/route.constant";
import { ADMIN, USER } from "constants/roles.constant";
import { Routes } from "./types";

const appsRoute: Routes = [
  {
    key: "dataSource.list",
    path: `${APP_PREFIX_PATH}/data-source/list`,
    component: React.lazy(() => import("views/dataSource/List")),
    authority: [ADMIN, USER],
    meta: {
      header: "Data Source",
      headerContainer: true,
    },
  },
  {
    key: "appsAccount.settings",
    path: `${APP_PREFIX_PATH}/account/settings/:tab`,
    component: React.lazy(() => import("views/account/Settings")),
    authority: [ADMIN, USER],
    meta: {
      header: "Settings",
      headerContainer: true,
    },
  },
  {
    key: "appsAccount.activityLog",
    path: `${APP_PREFIX_PATH}/account/activity-log`,
    component: React.lazy(() => import("views/account/ActivityLog")),
    authority: [ADMIN, USER],
  },
  {
    key: "appsAccount.kycForm",
    path: `${APP_PREFIX_PATH}/account/kyc-form`,
    component: React.lazy(() => import("views/account/KycForm")),
    authority: [ADMIN, USER],
  },
];

export default appsRoute;
