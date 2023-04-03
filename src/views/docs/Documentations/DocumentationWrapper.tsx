import React from "react";

const DocumentationWrapper = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="h-full w-full">
      <h3 className="mb-6">{title}</h3>
      <div className="prose dark:prose-invert max-w-[800px]">{children}</div>
    </div>
  );
};

export default DocumentationWrapper;
