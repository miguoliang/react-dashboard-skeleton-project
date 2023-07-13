import React from "react";
import { Routes } from "./types";

const protectedRoutes: Routes = [
  {
    key: "dashboard",
    path: `/dashboard`,
    component: React.lazy(() => import("views/Dashboard")),
  },
];

export default protectedRoutes;
