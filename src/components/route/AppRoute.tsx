import React, { LazyExoticComponent, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useThemeStore } from "store";

type AppRouteProps = {
  component: LazyExoticComponent<(props: Record<string, any>) => JSX.Element>;
  routeKey: string;
} & Record<string, any>;

const AppRoute = ({
  component: Component,
  routeKey,
  ...props
}: AppRouteProps) => {
  const location = useLocation();
  const themeStore = useThemeStore();
  useEffect(() => {
    themeStore.setCurrentRouteKey(routeKey);
  }, [location]);

  return <Component {...props} />;
};

export default AppRoute;
