import React, { ReactNode } from "react";
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
    <Flex as={"header"} className={className}>
      <Box>{headerStart}</Box>

      {headerMiddle && <Box>{headerMiddle}</Box>}
      <div className="header-action header-action-end">{headerEnd}</div>
    </Flex>
  );
};

export default Header;
