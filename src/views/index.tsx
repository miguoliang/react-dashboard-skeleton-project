import React, { Suspense } from "react";
import { Loading } from "components/shared";
import { protectedRoutes, publicRoutes } from "configs/routes.config";
import PageContainer, {
  PageContainerProps,
} from "components/template/PageContainer";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "components/route/ProtectedRoute";
import PublicRoute from "components/route/PublicRoute";
import AuthorityGuard from "components/route/AuthorityGuard";
import AppRoute from "components/route/AppRoute";
import { APP_PREFIX_PATH } from "../constants/route.constant";

const AllRoutes = (props: PageContainerProps) => {
  return (
    <Routes>
      <Route path={APP_PREFIX_PATH} element={<ProtectedRoute />}>
        {protectedRoutes.map((route, index) => (
          <Route
            key={route.key + index}
            path={route.path}
            element={
              <AuthorityGuard authority={route.authority}>
                <PageContainer {...props} {...route.meta}>
                  <AppRoute
                    routeKey={route.key}
                    component={route.component}
                    {...route.meta}
                  />
                </PageContainer>
              </AuthorityGuard>
            }
          />
        ))}
      </Route>
      <Route path="/" element={<PublicRoute />}>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <AppRoute
                routeKey={route.key}
                component={route.component}
                {...route.meta}
              />
            }
          />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const Views = (props: Record<string, any>) => {
  return (
    <Suspense fallback={<Loading loading={true} />}>
      <AllRoutes {...props} />
    </Suspense>
  );
};

export default Views;
