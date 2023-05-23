import React, { Suspense } from "react";
import { Loading } from "components/shared";
import { protectedRoutes, publicRoutes } from "configs/routes.config";
import appConfig from "configs/app.config";
import PageContainer, {
  PageContainerProps,
} from "components/template/PageContainer";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "components/route/ProtectedRoute";
import PublicRoute from "components/route/PublicRoute";
import AuthorityGuard from "components/route/AuthorityGuard";
import AppRoute from "components/route/AppRoute";
import { RootState } from "../store";
import { useAppSelector } from "store/hooks";

const { authenticatedEntryPath } = appConfig;

const AllRoutes = (props: PageContainerProps) => {
  const userAuthority = useAppSelector(
    (state: RootState) => state.auth.user.authority,
  );

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route
          path="/"
          element={<Navigate replace to={authenticatedEntryPath} />}
        />
        {protectedRoutes.map((route, index) => (
          <Route
            key={route.key + index}
            path={route.path}
            element={
              <AuthorityGuard
                userAuthority={userAuthority}
                authority={route.authority}
              >
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
        <Route path="*" element={<Navigate to="/" replace />} />
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
