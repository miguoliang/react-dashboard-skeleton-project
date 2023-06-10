import React from "react";
import { MenuItem, useConfig } from "components/ui";
import VerticalMenuIcon from "./VerticalMenuIcon";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { AuthorityCheck } from "components/shared";
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
  userAuthority?: string[];
}) => {
  const { nav, onLinkClick, sideCollapsed, userAuthority } = props;

  return (
    <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
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
    </AuthorityCheck>
  );
};

const VerticalSingleMenuItem = ({
  nav,
  onLinkClick,
  sideCollapsed,
  userAuthority = [],
  direction = useConfig().direction,
}: {
  nav: NavigationTree;
  onLinkClick?: (data: NavigationTree) => void;
  sideCollapsed: boolean;
  userAuthority: string[];
  direction: "ltr" | "rtl";
}) => {
  return (
    <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
      {sideCollapsed ? (
        <CollapsedItem
          title={nav.title}
          translateKey={nav.translateKey}
          direction={direction}
        >
          <DefaultItem
            nav={nav}
            sideCollapsed={sideCollapsed}
            onLinkClick={onLinkClick}
            userAuthority={userAuthority}
          />
        </CollapsedItem>
      ) : (
        <DefaultItem
          nav={nav}
          sideCollapsed={sideCollapsed}
          onLinkClick={onLinkClick}
          userAuthority={userAuthority}
        />
      )}
    </AuthorityCheck>
  );
};

export default VerticalSingleMenuItem;
