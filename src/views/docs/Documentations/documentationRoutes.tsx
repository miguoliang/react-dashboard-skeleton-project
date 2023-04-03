import { ComponentProps, lazy, LazyExoticComponent } from "react";

export type Route = {
  path: string;
  key: string;
  component: LazyExoticComponent<(props: ComponentProps<any>) => JSX.Element>;
  authority?: string[];
  label?: string;
  meta?: Record<string, any>;
};

export type Routes = Route[];

export type NavGroup = {
  groupName?: string;
  nav: Routes;
};

export type Nav = NavGroup[];

const documentationRoutes: Nav = [
  {
    groupName: "Getting Started",
    nav: [
      {
        path: "introduction",
        key: "Introduction",
        component: lazy(() => import("./components/Introduction")),
      },
      {
        path: "installation",
        key: "Installation",
        component: lazy(() => import("./components/Installation")),
      },
      {
        path: "tailwindcss",
        key: "TailwindCSS",
        component: lazy(() => import("./components/TailwindCss")),
      },
      {
        path: "css",
        key: "CSS",
        component: lazy(() => import("./components/Css")),
      },
      {
        path: "starter",
        key: "Starter",
        component: lazy(() => import("./components/Starter")),
      },
      {
        path: "updating",
        key: "Updating",
        component: lazy(() => import("./components/Updating")),
      },
    ],
  },
  {
    groupName: "Development",
    nav: [
      {
        path: "development-server",
        key: "Development Server",
        component: lazy(() => import("./components/DevelopmentServer")),
      },
      {
        path: "folder-structure",
        key: "Folder Structure",
        component: lazy(() => import("./components/FolderStructure")),
      },
      {
        path: "routing",
        key: "Routing",
        component: lazy(() => import("./components/Routing")),
      },
      {
        path: "redux",
        key: "Redux",
        component: lazy(() => import("./components/Redux")),
      },
      {
        path: "api-integration",
        key: "API Integration",
        component: lazy(() => import("./components/ApiIntegration")),
      },
      {
        path: "authentication",
        key: "Authentication",
        component: lazy(() => import("./components/Authentication")),
      },
      {
        path: "mock-api",
        key: "Mock Api",
        component: lazy(() => import("./components/MockApi")),
      },
    ],
  },
  {
    groupName: "Configuration",
    nav: [
      {
        path: "app",
        key: "App Config",
        component: lazy(() => import("./components/Application")),
      },
      {
        path: "layouts",
        key: "Layouts",
        component: lazy(() => import("./components/Layouts")),
      },
      {
        path: "navigation-config",
        key: "Navigation Config",
        component: lazy(() => import("./components/NavigationConfig")),
      },
      {
        path: "theme-color",
        key: "Theme Color",
        component: lazy(() => import("./components/ThemeColor")),
      },
      {
        path: "internationalization",
        key: "Internationalization",
        component: lazy(() => import("./components/Internationalization")),
      },
      {
        path: "dark-light-mode",
        key: "Dark/Light Mode",
        component: lazy(() => import("./components/DarkLightMode")),
      },
      {
        path: "direction",
        key: "Direction",
        component: lazy(() => import("./components/Direction")),
      },
      {
        path: "overall=theme-config",
        key: "Overall Theme Config",
        component: lazy(() => import("./components/OverallThemeConfig")),
      },
    ],
  },
  {
    groupName: "Deployment",
    nav: [
      {
        path: "build-production",
        key: "Build production",
        component: lazy(() => import("./components/BuildProduction")),
      },
    ],
  },
  {
    groupName: "Other",
    nav: [
      {
        path: "credit",
        key: "Sources & Credits",
        component: lazy(() => import("./components/Credit")),
      },
    ],
  },
];

export default documentationRoutes;
