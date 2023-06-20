import React from "react";
import Header from "components/template/Header";
import UserDropdown from "components/template/UserDropdown";
import LanguageSelector from "components/template/LanguageSelector";
import SideNavToggle from "components/template/SideNavToggle";
import MobileNav from "components/template/MobileNav";
import Search from "components/template/Search";
import SideNav from "components/template/SideNav";
import View from "views";
import classNames from "classnames";
import { useAuth } from "utils/hooks/useAuth";

export const SignInAndSignUp = ({ className }: { className?: string }) => {
  const auth = useAuth();
  return (
    <div
      className={classNames(
        className,
        "flex items-center leading-10 gap-2 font-bold capitalize cursor-pointer",
      )}
    >
      <div
        className="border-2 border-transparent px-5 rounded-lg hover:bg-gray-100 hover:border-gray-100"
        onClick={() => auth.userManager.signinRedirect()}
      >
        sign in
      </div>
      <div
        className="border-2 px-5 rounded-lg hover:bg-gray-100"
        onClick={() => auth.signOut()}
      >
        sign up
      </div>
    </div>
  );
};

const HeaderActionsStart = () => {
  return (
    <>
      <MobileNav />
      <SideNavToggle />
      <Search />
    </>
  );
};

const HeaderActionsEnd = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  return (
    <>
      <LanguageSelector />
      {isAuthenticated ? (
        <UserDropdown hoverable={false} />
      ) : (
        <SignInAndSignUp />
      )}
    </>
  );
};

const ModernLayout = (props: Record<string, any>) => {
  return (
    <div className="app-layout-modern flex flex-auto flex-col">
      <div className="flex flex-auto min-w-0">
        <SideNav />
        <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
          <Header
            className="border-b border-gray-200 dark:border-gray-700"
            headerEnd={<HeaderActionsEnd />}
            headerStart={<HeaderActionsStart />}
          />
          <View {...props} />
        </div>
      </div>
    </div>
  );
};

export default ModernLayout;
