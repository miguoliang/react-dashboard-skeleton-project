import React, { ReactNode } from "react";
import classNames from "classnames";
import { HEADER_HEIGHT_CLASS } from "constants/theme.constant";

type HeaderProps = {
  headerStart?: ReactNode;
  headerEnd?: ReactNode;
  headerMiddle?: ReactNode;
  className?: string;
  container?: boolean;
};

const Header = (props: HeaderProps) => {
  const { headerStart, headerEnd, headerMiddle, className, container } = props;

  return (
    <header className={classNames("header", className)}>
      <div
        className={classNames(
          "header-wrapper",
          HEADER_HEIGHT_CLASS,
          container && "container mx-auto"
        )}
      >
        <div className="header-action header-action-start">{headerStart}</div>
        {headerMiddle && (
          <div className="header-action header-action-middle">
            {headerMiddle}
          </div>
        )}
        <div className="header-action header-action-end">{headerEnd}</div>
      </div>
    </header>
  );
};

export default Header;
