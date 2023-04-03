import React from "react";
import { Dropdown, DropdownItem, MenuCollapse, MenuItem } from "components/ui";
import { Link } from "react-router-dom";
import VerticalMenuIcon from "./VerticalMenuIcon";
import { Trans } from "react-i18next";
import { AuthorityCheck } from "components/shared";
import { NavigationTree } from "configs/navigation.config/apps.navigation.config";

type DefaultItemProps = {
  nav: NavigationTree;
  onLinkClick?: (data: { key: string; title: string; path: string }) => void;
  userAuthority: string[];
  direction: "ltr" | "rtl";
};

const DefaultItem = ({ nav, onLinkClick, userAuthority }: DefaultItemProps) => {
  return (
    <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
      <MenuCollapse
        label={
          <>
            <VerticalMenuIcon icon={nav.icon} />
            <span>
              <Trans i18nKey={nav.translateKey} defaults={nav.title} />
            </span>
          </>
        }
        key={nav.key}
        eventKey={nav.key}
        expanded={false}
        className="mb-2"
      >
        {nav.subMenu.map((subNav: NavigationTree) => (
          <AuthorityCheck
            userAuthority={userAuthority}
            authority={subNav.authority}
            key={subNav.key}
          >
            <MenuItem eventKey={subNav.key}>
              {subNav.path ? (
                <Link
                  className="h-full w-full flex items-center"
                  onClick={() => onLinkClick?.(subNav)}
                  to={subNav.path}
                >
                  <span>
                    <Trans
                      i18nKey={subNav.translateKey}
                      defaults={subNav.title}
                    />
                  </span>
                </Link>
              ) : (
                <span>
                  <Trans
                    i18nKey={subNav.translateKey}
                    defaults={subNav.title}
                  />
                </span>
              )}
            </MenuItem>
          </AuthorityCheck>
        ))}
      </MenuCollapse>
    </AuthorityCheck>
  );
};

const CollapsedItem = ({
  nav,
  onLinkClick,
  userAuthority,
  direction,
}: DefaultItemProps) => {
  const menuItem = (
    <MenuItem key={nav.key} eventKey={nav.key} className="mb-2">
      <VerticalMenuIcon icon={nav.icon} />
    </MenuItem>
  );

  return (
    <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
      <Dropdown
        trigger="hover"
        renderTitle={menuItem}
        placement={direction === "rtl" ? "middle-end-top" : "middle-start-top"}
      >
        {nav.subMenu.map((subNav) => (
          <AuthorityCheck
            userAuthority={userAuthority}
            authority={subNav.authority}
            key={subNav.key}
          >
            <DropdownItem eventKey={subNav.key}>
              {subNav.path ? (
                <Link
                  className="h-full w-full flex items-center"
                  onClick={() =>
                    onLinkClick?.({
                      key: subNav.key,
                      title: subNav.title,
                      path: subNav.path,
                    })
                  }
                  to={subNav.path}
                >
                  <span>
                    <Trans
                      i18nKey={subNav.translateKey}
                      defaults={subNav.title}
                    />
                  </span>
                </Link>
              ) : (
                <span>
                  <Trans
                    i18nKey={subNav.translateKey}
                    defaults={subNav.title}
                  />
                </span>
              )}
            </DropdownItem>
          </AuthorityCheck>
        ))}
      </Dropdown>
    </AuthorityCheck>
  );
};

const VerticalCollapsedMenuItem = ({
  sideCollapsed,
  ...rest
}: {
  sideCollapsed: boolean;
} & DefaultItemProps) => {
  return sideCollapsed ? (
    <CollapsedItem {...rest} />
  ) : (
    <DefaultItem {...rest} />
  );
};

export default VerticalCollapsedMenuItem;
