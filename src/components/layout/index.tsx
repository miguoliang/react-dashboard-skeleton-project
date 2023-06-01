import React, { lazy, memo, Suspense, useMemo } from "react";
import { Loading } from "components/shared";
import useDirection from "utils/hooks/useDirection";
import useLocale from "utils/hooks/useLocale";
import CookieConsent from "react-cookie-consent";
import { useLocation } from "react-router-dom";
import { APP_PREFIX_PATH } from "../../constants/route.constant";

const Layout = () => {
  useDirection();

  useLocale();

  const location = useLocation();

  const AppLayout = useMemo(() => {
    return location.pathname.startsWith(APP_PREFIX_PATH)
      ? lazy(() => import("./ModernLayout"))
      : lazy(() => import("./SimpleLayout"));
  }, [location.pathname]);

  return (
    <Suspense
      fallback={
        <div className="flex flex-auto flex-col h-[100vh]">
          <Loading loading={true} />
        </div>
      }
    >
      <AppLayout />
      <CookieConsent enableDeclineButton flipButtons>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </Suspense>
  );
};

export default memo(Layout);
