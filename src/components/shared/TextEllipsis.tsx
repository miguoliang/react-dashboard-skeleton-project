import React from "react";

type TextEllipsisProps = {
  text: string;
  maxTextCount: number;
};

const TextEllipsis = (props: TextEllipsisProps) => {
  const { text, maxTextCount = 0 } = props;

  return (
    <>
      {(text && text.length) > maxTextCount
        ? text.substring(0, maxTextCount - 3) + "..."
        : text}
    </>
  );
};

export default TextEllipsis;
