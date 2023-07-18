import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const dropdownMenuItem = defineStyle({
  bg: "transparent",
  _hover: { bg: "gray.200" },
  minWidth: "150px",
  display: "flex",
  justifyContent: "space-between",
});

const navigationRootMenuItem = defineStyle({
  bg: "transparent",
  _hover: { bg: "gray.200" },
  display: "flex",
  justifyContent: "flex-start",
  textAlign: "left",
  px: 2,
});

export const buttonTheme = defineStyleConfig({
  variants: { dropdownMenuItem, navigationRootMenuItem },
});
