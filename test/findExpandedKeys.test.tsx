import { expect, test } from "vitest";
import {
  findExpandedKeys,
  NavigationMenuItem,
} from "../src/configs/navigation.config";

const navigationMenuItems: NavigationMenuItem[] = [
  {
    key: "1",
    path: "",
    title: "1",
    type: "collapse",
    authority: [],
    subMenu: [
      {
        key: "1.1",
        path: "",
        title: "1.1",
        type: "collapse",
        authority: [],
        subMenu: [
          {
            key: "1.1.1",
            path: "",
            title: "1.1.1",
            type: "item",
            authority: [],
          },
        ],
      },
      {
        key: "1.2",
        path: "",
        title: "1.2",
        type: "collapse",
        authority: [],
        subMenu: [
          {
            key: "1.2.1",
            path: "",
            title: "1.2.1",
            type: "item",
            authority: [],
          },
        ],
      },
    ],
  },
];

test("findExpandedKeys", () => {
  const expandedKeys = findExpandedKeys(navigationMenuItems[0], "1.2.1");
  expect(expandedKeys).toEqual(["1", "1.2", "1.2.1"]);
});
