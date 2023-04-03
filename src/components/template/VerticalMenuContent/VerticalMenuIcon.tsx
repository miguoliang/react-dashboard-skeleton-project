import React from "react";
import navigationIcon from "configs/navigation-icon.config";

export const Icon = ({ component: Component }: { component: string }) => {
  return (
    <>
      <Component />
    </>
  );
};

const VerticalMenuIcon = ({
  icon,
  gutter,
}: {
  icon: keyof typeof navigationIcon | React.ReactNode;
  gutter: boolean;
}) => {
  if (typeof icon !== "string") {
    return <>{icon}</>;
  }

  return (
    <span className={`text-2xl ${gutter ? "ltr:mr-2 rtl:ml-2" : ""}`}>
      {navigationIcon[icon]}
    </span>
  );
};

VerticalMenuIcon.defaultProps = {
  gutter: true,
};

export default VerticalMenuIcon;
