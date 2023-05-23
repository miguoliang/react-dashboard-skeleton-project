import React, { lazy, memo, Suspense, useMemo } from "react";
import { Loading } from "components/shared";
import useDirection from "utils/hooks/useDirection";
import useLocale from "utils/hooks/useLocale";
import { RootState } from "../../store";
import { useAppSelector } from "store/hooks";
import { useAuth } from "react-oidc-context";

const layouts: Record<
  string,
  React.LazyExoticComponent<(props: Record<string, any>) => JSX.Element>
> = {
  classic: lazy(() => import("./ClassicLayout")),
  modern: lazy(() => import("./ModernLayout")),
  stackedSide: lazy(() => import("./StackedSideLayout")),
  simple: lazy(() => import("./SimpleLayout")),
  decked: lazy(() => import("./DeckedLayout")),
  blank: lazy(() => import("./BlankLayout")),
};

const Layout = () => {
  const layoutType = useAppSelector(
    (state: RootState) => state.theme.layout.type,
  );

  useDirection();

  useLocale();

  const auth = useAuth();

  const AppLayout = useMemo(() => {
    if (auth.isAuthenticated) {
      return layouts[layoutType];
    }
    return lazy(() => import("./AuthLayout"));
  }, [layoutType, auth.isAuthenticated]);

  return (
    <Suspense
      fallback={
        <div className="flex flex-auto flex-col h-[100vh]">
          <Loading loading={true} />
        </div>
      }
    >
      <AppLayout />
    </Suspense>
  );
};

export default memo(Layout);
