import React from "react";
import { Routes } from "./types";

const protectedRoutes: Routes = [
  {
    key: "dashboard",
    path: `/dashboard`,
    component: React.lazy(() => import("views/Dashboard")),
  },
  {
    key: "dashboard.persons.list",
    path: `/dashboard/persons`,
    component: React.lazy(() => import("views/PersonList")),
  },
];

export default protectedRoutes;
