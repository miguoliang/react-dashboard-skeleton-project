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
];

export default appsRoute;
