import { lazy } from "react";
import { Nav } from "../Documentations/documentationRoutes";

const documentationRoutes: Nav = [
  {
    groupName: "Components",
    nav: [
      {
        path: "action-link",
        key: "action-link",
        label: "ActionLink",
        component: lazy(() => import("./components/ActionLinkDoc")),
      },
      {
        path: "adaptable-card",
        key: "adaptable-card",
        label: "AdaptableCard",
        component: lazy(() => import("./components/AdaptableCardDoc")),
      },
      {
        path: "affix",
        key: "affix",
        label: "Affix",
        component: lazy(() => import("./components/AffixDoc")),
      },
      {
        path: "authority-check",
        key: "authority-check",
        label: "AuthorityCheck",
        component: lazy(() => import("./components/AuthorityCheckDoc")),
      },
      {
        path: "calendar-view",
        key: "calendar-view",
        label: "CalendarView",
        component: lazy(() => import("./components/CalendarViewDoc")),
      },
      {
        path: "chart",
        key: "chart",
        label: "Chart",
        component: lazy(() => import("./components/ChartDoc")),
      },
      {
        path: "confirm-dialog",
        key: "confirm-dialog",
        label: "ConfirmDialog",
        component: lazy(() => import("./components/ConfirmDialogDoc")),
      },
      {
        path: "container",
        key: "container",
        label: "Container",
        component: lazy(() => import("./components/ContainerDoc")),
      },
      {
        path: "data-table",
        key: "data-table",
        label: "DataTable",
        component: lazy(() => import("./components/DataTableDoc")),
      },
      {
        path: "double-sided-image",
        key: "double-sided-image",
        label: "DoubleSidedImage",
        component: lazy(() => import("./components/DoubleSidedImageDoc")),
      },
      {
        path: "ellipsis-button",
        key: "ellipsis-button",
        label: "EllipsisButton",
        component: lazy(() => import("./components/EllipsisButtonDoc")),
      },
      {
        path: "form-numeric-input",
        key: "form-numeric-input",
        label: "FormNumericIput",
        component: lazy(() => import("./components/FormNumericInputDoc")),
      },
      {
        path: "grow-shrink-tag",
        key: "grow-shrink-tag",
        label: "GrowShrinkTag",
        component: lazy(() => import("./components/GrowShrinkTagDoc")),
      },
      {
        path: "icon-text",
        key: "icon-text",
        label: "IconText",
        component: lazy(() => import("./components/IconTextDoc")),
      },
      {
        path: "loading",
        key: "loading",
        label: "Loading",
        component: lazy(() => import("./components/LoadingDoc")),
      },
      {
        path: "media-skeleton",
        key: "media-skeleton",
        label: "MediaSkeleton",
        component: lazy(() => import("./components/MediaSkeletonDoc")),
      },
      {
        path: "nav-toggle",
        key: "nav-toggle",
        label: "NavToggle",
        component: lazy(() => import("./components/NavToggleDoc")),
      },
      {
        path: "password-input",
        key: "password-input",
        label: "PasswordInput",
        component: lazy(() => import("./components/PasswordInputDoc")),
      },
      {
        path: "region-map",
        key: "region-map",
        label: "RegionMap",
        component: lazy(() => import("./components/RegionMapDoc")),
      },
      {
        path: "rich-text-editor",
        key: "rich-text-editor",
        label: "RichTextEditor",
        component: lazy(() => import("./components/RichTextEditorDoc")),
      },
      {
        path: "segment-item-option",
        key: "segment-item-option",
        label: "SegmentItemOption",
        component: lazy(() => import("./components/SegmentItemOptionDoc")),
      },
      {
        path: "sticky-footer",
        key: "sticky-footer",
        label: "StickyFooter",
        component: lazy(() => import("./components/StickyFooterDoc")),
      },
      {
        path: "svg-icon",
        key: "svg-icon",
        label: "SvgIcon",
        component: lazy(() => import("./components/SvgIconDoc")),
      },
      {
        path: "syntax-highlighter",
        key: "syntax-highlighter",
        label: "SyntaxHighlighter",
        component: lazy(() => import("./components/SyntaxHighlighterDoc")),
      },
      {
        path: "table-row-skeleton",
        key: "table-row-skeleton",
        label: "TableRowSkeleton",
        component: lazy(() => import("./components/TableRowSkeletonDoc")),
      },
      {
        path: "text-block-skeleton",
        key: "text-block-skeleton",
        label: "TextBlockSkeletonDoc",
        component: lazy(() => import("./components/TextBlockSkeletonDoc")),
      },
      {
        path: "text-ellipsis",
        key: "text-ellipsis",
        label: "TextEllipsisDoc",
        component: lazy(() => import("./components/TextEllipsisDoc")),
      },
      {
        path: "users-avatar-group",
        key: "users-avatar-group",
        label: "UsersAvatarGroupDoc",
        component: lazy(() => import("./components/UsersAvatarGroupDoc")),
      },
    ],
  },
];

export default documentationRoutes;
