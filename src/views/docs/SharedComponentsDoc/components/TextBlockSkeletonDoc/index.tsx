import React from "react";

import DemoLayout from "components/docs/DemoLayout";

// Demo
import Example from "./Example";
import { DemoComponentType } from "components/docs/DemoComponentApi";

const mdPath: string = "TextBlockSkeletonDoc/";

export type DemoHeader = {
  title: string;
  desc: string;
};

const demoHeader: DemoHeader = {
  title: "TextBlockSkeleton",
  desc: "TextBlockSkeleton is a combination of Skeleton component for display a loading state of text bloack.",
};

export type DemoType = {
  mdName: string;
  mdPath: string;
  title: string;
  desc: string;
  component: JSX.Element;
};

const demos: DemoType[] = [
  {
    mdName: "Example",
    mdPath: mdPath,
    title: "Example",
    desc: ``,
    component: <Example />,
  },
];

const demoApi: DemoComponentType[] = [
  {
    component: "TextBlockSkeleton",
    api: [
      {
        propName: "height",
        type: `<code>string</code> | <code>ReactNode</code>`,
        default: `-`,
        desc: "Thickness of the skeleton bar",
      },
      {
        propName: "lastChildWidth",
        type: `<code>string</code> | <code>number</code>`,
        default: `<code>'60%'</code>`,
        desc: "Width of the last skeleton bar",
      },
      {
        propName: "rowCount",
        type: `<code>number</code>`,
        default: `<code>3</code>`,
        desc: "Total skeleton bar rows to display",
      },
      {
        propName: "title",
        type: `<code>boolean</code>`,
        default: `<code>true</code>`,
        desc: "Whether to display title skeleton bar",
      },
      {
        propName: "titleWidth",
        type: `<code>string</code> | <code>number</code>`,
        default: `<code>'40%'</code>`,
        desc: "Width of the title skeleton bar",
      },
    ],
  },
];

const TextBlockSkeletonDoc = () => {
  return (
    <DemoLayout
      innerFrame={false}
      header={demoHeader}
      demos={demos}
      api={demoApi}
      mdPrefixPath="docs/SharedComponentsDoc/components"
    />
  );
};

export default TextBlockSkeletonDoc;
