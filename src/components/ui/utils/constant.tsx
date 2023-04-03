export const CONTROL_SIZES: Record<Size, number> = {
  xs: 7,
  sm: 9,
  md: 11,
  lg: 14,
};

export type Size = "xs" | "sm" | "md" | "lg";

export type Shape = "rounded" | "none" | "circle" | "square";

export type Layout = "horizontal" | "vertical" | "inline";

export type Direction = "top" | "right" | "bottom" | "left";

export type TextDirection = "ltr" | "rtl";

export type SelectionMode = "year" | "month" | "day";

export type PickerView = "year" | "month" | "date";

export type Status = "info" | "danger" | "success" | "warning";

export type StepStatus = "complete" | "pending" | "in-progress" | "error";

export type ChartType = "line" | "bar" | "area" | "donut";

export type Placement =
  | "auto"
  | "auto-end"
  | "auto-start"
  | "bottom"
  | "bottom-center"
  | "bottom-end"
  | "bottom-start"
  | "bottom-full"
  | "left"
  | "left-end"
  | "left-start"
  | "middle"
  | "middle-end-bottom"
  | "middle-end-top"
  | "middle-start-bottom"
  | "middle-start-top"
  | "right"
  | "right-end"
  | "right-start"
  | "top"
  | "top-center"
  | "top-end"
  | "top-start"
  | "top-full";

export type DropdownItemType = "default" | "header" | "divider" | "custom";

export const DAY_DURATION = 86400000;

export type FormFieldType = { name?: string; value?: any };

export type CustomRefElementProps<
  Props,
  Element extends keyof JSX.IntrinsicElements,
> = Props & Omit<JSX.IntrinsicElements[Element], keyof Props | "ref">;

export const noop = () => false;
