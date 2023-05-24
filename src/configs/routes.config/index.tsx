import React from "react";
import appsRoute from "./appsRoute";
import { Routes } from "./types";

export const publicRoutes: Routes = [
  {
    key: "home",
    path: "/",
    component: React.lazy(() => import("views/Home")),
  },
];

export const protectedRoutes: Routes = [...appsRoute];
