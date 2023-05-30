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
    key: "dataSource.knowledgeGraph",
    path: `${APP_PREFIX_PATH}/data-source/:id/knowledge-graph`,
    component: React.lazy(() => import("views/dataSource/KnowledgeGraph")),
    authority: [USER],
    meta: {
      header: "Knowledge Graph",
      headerContainer: true,
    },
  },
  {
    key: "account.settings.profile",
    path: `${APP_PREFIX_PATH}/account/settings/profile`,
    component: React.lazy(() => import("views/account/Settings")),
    authority: [USER],
    meta: {
      header: "Settings",
      headerContainer: true,
    },
  },
  {
    key: "account.settings.password",
    path: `${APP_PREFIX_PATH}/account/settings/password`,
    component: React.lazy(() => import("views/account/Settings")),
    authority: [USER],
    meta: {
      header: "Settings",
      headerContainer: true,
    },
  },
];

export default appsRoute;
