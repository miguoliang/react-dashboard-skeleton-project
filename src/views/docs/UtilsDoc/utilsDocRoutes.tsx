import { lazy } from "react";
import { Nav } from "../Documentations/documentationRoutes";

const utilsDocRoutes: Nav = [
  {
    groupName: "Hooks",
    nav: [
      {
        path: "use-auth",
        key: "use-auth",
        label: "useAuth",
        component: lazy(() => import("./components/UseAuthDoc")),
      },
      {
        path: "use-authority",
        key: "use-authority",
        label: "useAuthority",
        component: lazy(() => import("./components/UseAuthorityDoc")),
      },
      {
        path: "use-dark-mode",
        key: "use-dark-mode",
        label: "useDarkMode",
        component: lazy(() => import("./components/UseDarkModeDoc")),
      },
      {
        path: "use-direction",
        key: "use-direction",
        label: "useDirection",
        component: lazy(() => import("./components/UseDirectionDoc")),
      },
      {
        path: "use-locale",
        key: "use-locale",
        label: "useLocale",
        component: lazy(() => import("./components/UseLocaleDoc")),
      },
      {
        path: "use-menu-active",
        key: "use-menu-active",
        label: "useMenuActive",
        component: lazy(() => import("./components/UseMenuActiveDoc")),
      },
      {
        path: "use-query",
        key: "use-query",
        label: "useQuery",
        component: lazy(() => import("./components/UseQueryDoc")),
      },
      {
        path: "use-responsive",
        key: "use-responsive",
        label: "useResponsive",
        component: lazy(() => import("./components/UseResponsiveDoc")),
      },
      {
        path: "use-theme-class",
        key: "use-theme-class",
        label: "useThemeClass",
        component: lazy(() => import("./components/UseThemeClassDoc")),
      },
      {
        path: "use-time-out-message",
        key: "use-time-out-message",
        label: "useTimeOutMessage",
        component: lazy(() => import("./components/UseTimeOutMessageDoc")),
      },
      {
        path: "use-tw-color-by-name",
        key: "use-tw-color-by-name",
        label: "useTwColorByName",
        component: lazy(() => import("./components/UseTwColorByNameDoc")),
      },
    ],
  },
  {
    groupName: "Functions",
    nav: [
      {
        path: "acronym",
        key: "acronym",
        label: "acronym",
        component: lazy(() => import("./components/AcronymDoc")),
      },
      {
        path: "deep-parse-json",
        key: "deep-parse-json",
        label: "deepParseJson",
        component: lazy(() => import("./components/DeepParseJsonDoc")),
      },
      {
        path: "grow-shrink-color",
        key: "grow-shrink-color",
        label: "growShrinkColor",
        component: lazy(() => import("./components/GrowShrinkColorDoc")),
      },
      {
        path: "is-last-child",
        key: "is-last-child",
        label: "isLastChild",
        component: lazy(() => import("./components/IsLastChildDoc")),
      },
      {
        path: "paginate",
        key: "paginate",
        label: "paginate",
        component: lazy(() => import("./components/PaginateDoc")),
      },
      {
        path: "required-field-validation",
        key: "required-field-validation",
        label: "requiredFieldValidation",
        component: lazy(
          () => import("./components/RequiredFieldValidationDoc")
        ),
      },
      {
        path: "shade-color",
        key: "shade-color",
        label: "shadeColor",
        component: lazy(() => import("./components/ShadeColorDoc")),
      },
      {
        path: "sort-by",
        key: "sort-by",
        label: "sortBy",
        component: lazy(() => import("./components/SortByDoc")),
      },
      {
        path: "wild-card-search",
        key: "wild-card-search",
        label: "wildCardSearch",
        component: lazy(() => import("./components/WildCardSearchDoc")),
      },
    ],
  },
  {
    groupName: "HOC",
    nav: [
      {
        path: "with-header-item",
        key: "with-header-item",
        label: "withHeaderItem",
        component: lazy(() => import("./components/WithHeaderItemDoc")),
      },
    ],
  },
];

export default utilsDocRoutes;
