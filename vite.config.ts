import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import checker from "vite-plugin-checker";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-macros", "babel-plugin-styled-components"],
      },
      fastRefresh: process.env.NODE_ENV !== "test",
    }),
    checker({ typescript: true }),
    svgrPlugin(),
  ],
  build: {
    dynamicImportVarsOptions: {
      include: ["**/*.md"],
    },
  },
  server: { open: true, port: 3000 },
  define: {
    "process.env": `"{}"`,
  },
  resolve: {
    alias: [
      {
        find: /^assets(\/(.+)|$)/,
        replacement: resolve(__dirname, "src/assets/") + "$1",
      },
      {
        find: /^components(\/(.+)|$)/,
        replacement: resolve(__dirname, "src/components/") + "$1",
      },
      {
        find: /^configs(\/(.+)|$)/,
        replacement: resolve(__dirname, "src/configs/") + "$1",
      },
      {
        find: /^constants(\/(.+)|$)/,
        replacement: resolve(__dirname, "src/constants/") + "$1",
      },
      {
        find: /^locales(\/(.+)|$)/,
        replacement: resolve(__dirname, "src/locales/") + "$1",
      },
      {
        find: /^mock(\/(.+)|$)/,
        replacement: resolve(__dirname, "src/mock/") + "$1",
      },
      {
        find: /^services(\/(.+)|$)/,
        replacement: resolve(__dirname, "src/services/") + "$1",
      },
      {
        find: /^hooks(\/(.+)|$)/,
        replacement: resolve(__dirname, "src/hooks/") + "$1",
      },
      {
        find: /^utils(\/(.+)|$)/,
        replacement: resolve(__dirname, "src/utils/") + "$1",
      },
      {
        find: /^views(\/(.+)|$)/,
        replacement: resolve(__dirname, "src/views/") + "$1",
      },
    ],
  },
});
