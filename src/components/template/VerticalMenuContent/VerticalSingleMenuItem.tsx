import React from "react";
import { MenuItem, useConfig } from "components/ui";
import VerticalMenuIcon from "./VerticalMenuIcon";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { NavigationTree } from "configs/navigation.config/apps.navigation.config";
import { Tooltip } from "@chakra-ui/react";

const CollapsedItem = ({
  title,
  translateKey,
  children,
  direction,
}: {
  title: string;
  translateKey?: string;
  children: React.ReactNode;
  direction: "ltr" | "rtl";
}) => {
  const { t } = useTranslation();

  return (
    <Tooltip
      title={translateKey ? t(translateKey) || title : translateKey}
      placement={direction === "rtl" ? "left" : "right"}
    >
      {children}
    </Tooltip>
  );
};

const DefaultItem = (props: {
  nav: NavigationTree;
  onLinkClick?: (data: NavigationTree) => void;
  sideCollapsed: boolean;
}) => {
  const { nav, onLinkClick, sideCollapsed } = props;

  return (
    <MenuItem key={nav.key} eventKey={nav.key} className="mb-2">
      <Link
        to={nav.path}
        onClick={() => onLinkClick?.(nav)}
        className="flex items-center h-full w-full"
      >
        <VerticalMenuIcon icon={nav.icon} />
        {!sideCollapsed && (
          <span>
            <Trans i18nKey={nav.translateKey} defaults={nav.title} />
          </span>
        )}
      </Link>
    </MenuItem>
  );
};

const VerticalSingleMenuItem = ({
  nav,
  onLinkClick,
  sideCollapsed,
  direction = useConfig().direction,
}: {
  nav: NavigationTree;
  onLinkClick?: (data: NavigationTree) => void;
  sideCollapsed: boolean;
  direction: "ltr" | "rtl";
}) => {
  return sideCollapsed ? (
    <CollapsedItem
      title={nav.title}
      translateKey={nav.translateKey}
      direction={direction}
    >
      <DefaultItem
        nav={nav}
        sideCollapsed={sideCollapsed}
        onLinkClick={onLinkClick}
      />
    </CollapsedItem>
  ) : (
    <DefaultItem
      nav={nav}
      sideCollapsed={sideCollapsed}
      onLinkClick={onLinkClick}
    />
  );
};

export default VerticalSingleMenuItem;
