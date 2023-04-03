import React from "react";
import { DropdownItem } from "components/ui";
import HorizontalMenuNavLink from "./HorizontalMenuNavLink";
import { useTranslation } from "react-i18next";
import { NavigationTree } from "../../../configs/navigation.config/apps.navigation.config";

const HorizontalMenuDropdownItem = ({ nav }: { nav: NavigationTree }) => {
  const { title, translateKey, path, key } = nav;

  const { t } = useTranslation();

  const itemTitle = t(translateKey, title);

  return (
    <DropdownItem eventKey={key}>
      {path ? (
        <HorizontalMenuNavLink path={path}>{itemTitle}</HorizontalMenuNavLink>
      ) : (
        <span>{itemTitle}</span>
      )}
    </DropdownItem>
  );
};

export default HorizontalMenuDropdownItem;
