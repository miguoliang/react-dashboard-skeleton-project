import React, { lazy, memo, Suspense, useMemo } from "react";
import { Loading } from "components/shared";
import useDirection from "utils/hooks/useDirection";
import useLocale from "utils/hooks/useLocale";
import { RootState } from "../../store";
import useAuth from "utils/hooks/useAuth";
import { useAppSelector } from "store/hooks";

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
  const layoutType = useAppSelector((state: RootState) => state.theme.layout.type);

  const { authenticated } = useAuth();

  useDirection();

  useLocale();

  const AppLayout = useMemo(() => {
    if (authenticated) {
      return layouts[layoutType];
    }
    return lazy(() => import("./AuthLayout"));
  }, [layoutType, authenticated]);

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
