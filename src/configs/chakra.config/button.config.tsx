import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const dropdownMenuItem = defineStyle({
  bg: "transparent",
  _hover: { bg: "gray.100" },
  minWidth: "150px",
  display: "flex",
  justifyContent: "space-between",
});

export const buttonTheme = defineStyleConfig({
  variants: { dropdownMenuItem },
});
