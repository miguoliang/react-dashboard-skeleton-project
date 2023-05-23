import React from "react";
import appConfig from "configs/app.config";
import { REDIRECT_URL_KEY } from "constants/app.constant";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "react-oidc-context";

const { unAuthenticatedEntryPath } = appConfig;

const ProtectedRoute = () => {
  const auth = useAuth();

  const location = useLocation();

  if (!auth.isAuthenticated) {
    return (
      <Navigate
        to={`${unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${location.pathname}`}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
