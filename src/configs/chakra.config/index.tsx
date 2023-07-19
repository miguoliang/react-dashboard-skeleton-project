import { extendTheme } from "@chakra-ui/react";
import { menuTheme } from "./menu.config";
import { tableTheme } from "./table.config";
import { inputTheme } from "./input.config";
import { formLabelTheme } from "./form-label.config";
import { formErrorTheme } from "./form-error.config";
import { cardTheme } from "./card.config";
import { buttonTheme } from "./button.config";
import { tooltipTheme } from "./tooltip.config";
import resolveConfig from "tailwindcss/resolveConfig";

// @ts-ignore
import * as tailwindConfig from "../../../tailwind.config.mjs";
import { first, join, map, mapValues } from "lodash";

const tailwindTheme = resolveConfig(tailwindConfig).theme;

function addMissingBaseField(obj: any, value?: any) {
  return {
    base: value ?? obj.DEFAULT,
    ...obj,
  };
}

export const theme = extendTheme({
  blur: addMissingBaseField(tailwindTheme.blur),
  breakpoints: addMissingBaseField(tailwindTheme.screens, "0px"),
  colors: tailwindTheme.colors,
  radius: addMissingBaseField(tailwindTheme.borderRadius),
  shadows: addMissingBaseField(tailwindTheme.boxShadow),
  space: addMissingBaseField(tailwindTheme.spacing),
  sizes: {
    container: tailwindTheme.container,
    ...tailwindTheme.spacing,
    ...tailwindTheme.maxWidth,
  },
  transition: {
    duration: tailwindTheme.transitionDuration,
    easing: tailwindTheme.transitionTimingFunction,
    property: tailwindTheme.transitionProperty,
  },
  letterSpacings: tailwindTheme.letterSpacing,
  lineHeights: tailwindTheme.lineHeight,
  fontWeights: tailwindTheme.fontWeight,
  fonts: mapValues(tailwindTheme.fontFamily, (value) => join(value, ",")),
  fontSizes: map(tailwindTheme.fontSize, first),
  zIndices: tailwindTheme.zIndex,
  components: {
    Menu: menuTheme,
    Table: tableTheme,
    Input: inputTheme,
    FormLabel: formLabelTheme,
    FormError: formErrorTheme,
    Card: cardTheme,
    Button: buttonTheme,
    Tooltip: tooltipTheme,
  },
});
