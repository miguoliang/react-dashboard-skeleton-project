import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  list: {
    // this will style the MenuList component
    p: "2",
    borderRadius: "lg",
    border: "1",
    boxShadow: "lg",
    minWidth: "160px",
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    borderRadius: "md",
    fontWeight: "semibold",
    height: "35px",
    _hover: {
      bg: "gray.100",
    },
    _focus: {
      bg: "gray.100",
    },
  },
});
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle });
