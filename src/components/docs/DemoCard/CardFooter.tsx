import React, { useCallback, useEffect, useState } from "react";
import { Button, Spinner, Tooltip } from "components/ui";
import { CgCode, CgCodeSlash, CgCopy } from "react-icons/cg";
import { HiCheck } from "react-icons/hi";
import CodeBox from "./CodeBox";
import { noop } from "lodash";

const CardFooter = (props: {
  mdPath?: string;
  mdName?: string;
  mdPrefixPath?: string;
}) => {
  const { mdPath, mdName, mdPrefixPath = "ui-components" } = props;

  const [expand, setExpand] = useState(false);
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [loadingMd, setLoadingMd] = useState(false);

  const onExpand = useCallback(() => {
    setExpand(!expand);
  }, [expand]);

  const fetchMd = async () => {
    setLoadingMd(true);
    const file = await import(
      /* @vite-ignore */ `../../../views/${mdPrefixPath}/${mdPath}markdown/${mdName}.md?raw`
    );
    setMarkdown(file.default);
    setLoadingMd(false);
  };

  useEffect(() => {
    if (expand && !markdown) {
      fetchMd().then(noop);
    }
    if (copied && markdown) {
      navigator.clipboard
        .writeText(markdown.replace(/```jsx|```/g, ""))
        .then(noop);
      const copyFeedbackInterval = setTimeout(() => setCopied(false), 3000);
      return () => {
        clearTimeout(copyFeedbackInterval);
      };
    }
  }, [mdPath, expand, copied]);

  const onCodeCopy = async () => {
    if (!markdown) {
      await fetchMd();
    }
    setCopied(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>{loadingMd && <Spinner />}</div>
        <div>
          <Tooltip title={copied ? "Copied" : "Copy Code"} wrapperClass="mr-1">
            <Button
              onClick={() => onCodeCopy()}
              variant="plain"
              shape="circle"
              size="xs"
              icon={
                copied ? <HiCheck className="text-emerald-500" /> : <CgCopy />
              }
            />
          </Tooltip>
          <Tooltip title={expand ? "Hide Code" : "Show Code"}>
            <Button
              onClick={() => onExpand()}
              variant="plain"
              shape="circle"
              size="xs"
              icon={expand ? <CgCode /> : <CgCodeSlash />}
            />
          </Tooltip>
        </div>
      </div>
      <div className={expand ? "block" : "hidden"}>
        <CodeBox markdown={markdown || ""} />
      </div>
    </div>
  );
};

export default CardFooter;
