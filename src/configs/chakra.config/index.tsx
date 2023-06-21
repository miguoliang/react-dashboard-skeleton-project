import { Avatar, extendTheme } from "@chakra-ui/react";
import { menuTheme } from "./menu.config";
import { tableTheme } from "./table.config";

export const chakraTheme = extendTheme({
  colors: {
    gray: {
      "50": "#F9FAFB",
      "100": "#F3F4F6",
      "200": "#E5E7EB",
      "300": "#D1D5DB",
      "400": "#9CA3AF",
      "500": "#6B7280",
      "600": "#4B5563",
      "700": "#374151",
      "800": "#1F2937",
      "900": "#111827",
    },
  },
  sizes: {
    "9xl": "96rem",
  },
  components: {
    Avatar,
    Menu: menuTheme,
    Table: tableTheme,
  },
});
