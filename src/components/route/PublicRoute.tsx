import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import appConfig from "configs/app.config";
import { useAuth } from "react-oidc-context";

const { authenticatedEntryPath } = appConfig;

const PublicRoute = () => {
  const auth = useAuth();

  return auth.isAuthenticated ? (
    <Navigate to={authenticatedEntryPath} />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
