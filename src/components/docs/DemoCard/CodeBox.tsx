import React from "react";
import Markdown from "react-markdown";
import { SyntaxHighlighter } from "components/shared";
import { CodeComponent } from "react-markdown/src/ast-to-react";
import { isArray, isString } from "lodash";

function isStringOrStringArray(value: unknown): value is string | string[] {
  if (isString(value)) {
    return true;
  } else if (isArray(value) && value.every(isString)) {
    return true;
  }
  return false;
}

const Highlighter: CodeComponent = (props) => {
  return isStringOrStringArray(props.children) ? (
    <SyntaxHighlighter className="text-base" language="jsx">
      {props.children}
    </SyntaxHighlighter>
  ) : null;
};

const CodeBox = (props: { markdown: string }) => {
  const { markdown } = props;

  return (
    <Markdown
      children={markdown}
      components={{
        code: Highlighter,
      }}
    />
  );
};

export default CodeBox;
