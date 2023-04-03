import appsRoute from "./appsRoute";
import uiComponentsRoute from "./uiComponentsRoute";
import pagesRoute from "./pagesRoute";
import docsRoute from "./docsRoute";
import { Routes } from "../../views/docs/Documentations/documentationRoutes";

export const publicRoutes: Routes = [];

export const protectedRoutes: Routes = [
  ...appsRoute,
  ...uiComponentsRoute,
  ...pagesRoute,
  ...docsRoute,
];
