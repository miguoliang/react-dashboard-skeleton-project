import React from "react";
import { Outlet } from "react-router-dom";
import { hasAuthParams, useAuth } from "react-oidc-context";

const ProtectedRoute = () => {
  const auth = useAuth();
  // automatically sign-in if there are no auth params
  React.useEffect(() => {
    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading
    ) {
      debugger;
      auth.signinRedirect();
    }
  }, [
    auth.isAuthenticated,
    auth.activeNavigator,
    auth.isLoading,
    auth.signinRedirect,
  ]);

  return <Outlet />;
};

export default ProtectedRoute;
