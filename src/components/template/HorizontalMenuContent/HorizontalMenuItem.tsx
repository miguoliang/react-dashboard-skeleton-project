import React from "react";
import navigationIcon from "configs/navigation-icon.config";
import HorizontalMenuNavLink from "./HorizontalMenuNavLink";
import { useTranslation } from "react-i18next";
import { NavigationTree } from "../../../configs/navigation.config/apps.navigation.config";
import { NavMode } from "../../../constants/theme.constant";
import { MenuItem } from "components/ui";

const HorizontalMenuItem = ({
  nav,
  isLink,
  menuVariant,
}: {
  nav: NavigationTree;
  isLink?: boolean;
  menuVariant?: NavMode;
}) => {
  const { title, translateKey, icon, path } = nav;

  const { t } = useTranslation();

  const itemTitle = t(translateKey, title);

  return (
    <MenuItem variant={menuVariant} eventKey={nav.key}>
      {icon && <span className="text-2xl">{navigationIcon[icon]}</span>}
      {path && isLink ? (
        <HorizontalMenuNavLink path={path}>{itemTitle}</HorizontalMenuNavLink>
      ) : (
        <span>{itemTitle}</span>
      )}
    </MenuItem>
  );
};

export default HorizontalMenuItem;
