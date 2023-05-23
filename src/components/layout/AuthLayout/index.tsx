import React from "react";
import Side from "./Side";
import View from "views";
import { RootState } from "../../../store";
import { useAppSelector } from "store/hooks";

const AuthLayout = (props: Record<string, any>) => {
  const layoutType = useAppSelector(
    (state: RootState) => state.theme.layout.type,
  );

  return (
    <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
      {layoutType === "blank" ? (
        <View {...props} />
      ) : (
        <Side>
          <View {...props} />
        </Side>
      )}
    </div>
  );
};

export default AuthLayout;
