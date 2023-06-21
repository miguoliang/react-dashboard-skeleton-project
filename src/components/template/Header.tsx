import React, { ReactNode } from "react";
import classNames from "classnames";
import { Box, Flex } from "@chakra-ui/react";

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
      <Flex>
        <Box>{headerStart}</Box>

        {headerMiddle && <Box>{headerMiddle}</Box>}
        <div className="header-action header-action-end">{headerEnd}</div>
      </Flex>
    </header>
  );
};

export default Header;
