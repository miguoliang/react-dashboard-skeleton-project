import React from "react";
import { Prism, SyntaxHighlighterProps } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const SyntaxHighlighter = (props: SyntaxHighlighterProps) => {
  const { children, ...rest } = props;

  return (
    <Prism style={oneDark} {...rest}>
      {children}
    </Prism>
  );
};

export default SyntaxHighlighter;
