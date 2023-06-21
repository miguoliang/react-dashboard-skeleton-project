import React, { lazy, memo, Suspense, useEffect, useMemo } from "react";
import { Loading } from "components/shared";
import CookieConsent from "react-cookie-consent";
import { useLocation } from "react-router-dom";
import { APP_PREFIX_PATH } from "constants/route.constant";
import { useAuth } from "hooks/useAuth";

const Layout = () => {
  const location = useLocation();
  const AppLayout = useMemo(() => {
    return location.pathname.startsWith(APP_PREFIX_PATH)
      ? lazy(() => import("./ModernLayout"))
      : lazy(() => import("./SimpleLayout"));
  }, [location.pathname]);

  const auth = useAuth();
  useEffect(() => {
    if (
      window.location.pathname === "/" &&
      window.location.href.indexOf("code") !== -1
    ) {
      auth.userManager.signinRedirectCallback().then(async () => {
        window.history.replaceState({}, document.title, "/");
        const user = await auth.userManager.getUser();
        auth.setUser(user ?? undefined);
        auth.setAuthenticated(true);
      });
      return;
    }

    auth.userManager.getUser().then((user) => {
      if (user) {
        auth.setUser(user);
        auth.setAuthenticated(true);
      }
    });
  }, []);

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
