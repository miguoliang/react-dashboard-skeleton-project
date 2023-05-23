import React from "react";
import classNames from "classnames";
import { Badge, Select, useConfig } from "components/ui";
import { setThemeColor, setThemeColorLevel } from "store/theme/themeSlice";
import { HiCheck } from "react-icons/hi";
import { components, ControlProps, OptionProps } from "react-select";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { SelectChangeHandler } from "../../ui/Select/Select";

const { Control } = components;

type ColorListOption = {
  label: string;
  value: string;
};

const colorList: ColorListOption[] = [
  { label: "Red", value: "red" },
  { label: "Orange", value: "orange" },
  { label: "Amber", value: "amber" },
  { label: "Yellow", value: "yellow" },
  { label: "Lime", value: "lime" },
  { label: "Green", value: "green" },
  { label: "Emerald", value: "emerald" },
  { label: "Teal", value: "teal" },
  { label: "Cyan", value: "cyan" },
  { label: "Sky", value: "sky" },
  { label: "Blue", value: "blue" },
  { label: "Indigo", value: "indigo" },
  { label: "Violet", value: "violet" },
  { label: "Purple", value: "purple" },
  { label: "Fuchsia", value: "fuchsia" },
  { label: "Pink", value: "pink" },
  { label: "Rose", value: "rose" },
];

type ColorLevelListOption = {
  label: string;
  value: number;
};

const colorLevelList: ColorLevelListOption[] = [
  { label: "400", value: 400 },
  { label: "500", value: 500 },
  { label: "600", value: 600 },
  { label: "700", value: 700 },
  { label: "800", value: 800 },
  { label: "900", value: 900 },
];

const ColorBadge = ({
  className,
  themeColor,
}: {
  className?: string;
  themeColor: string;
}) => {
  const primaryColorLevel = useAppSelector(
    (state) => state.theme.primaryColorLevel,
  );

  return (
    <Badge
      className={className}
      innerClass={classNames(`bg-${themeColor}-${primaryColorLevel}`)}
    />
  );
};

const CustomSelectOption = ({
  innerProps,
  label,
  data,
  isSelected,
}: OptionProps<ColorListOption>) => {
  return (
    <div
      className={`flex items-center justify-between p-2 ${
        isSelected
          ? "bg-gray-100 dark:bg-gray-500"
          : "hover:bg-gray-50 dark:hover:bg-gray-600"
      }`}
      {...innerProps}
    >
      <div className="flex items-center gap-2">
        <ColorBadge themeColor={data.value} />
        <span>{label}</span>
      </div>
      {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
    </div>
  );
};

const CustomControl = ({
  children,
  ...props
}: ControlProps<ColorListOption>) => {
  const selected = props.getValue();

  const themeColor = useAppSelector((state) => state.theme.themeColor);

  return (
    <Control {...props}>
      {selected.length > 0 ? (
        <ColorBadge themeColor={themeColor} className="ltr:ml-4 rtl:mr-4" />
      ) : null}
      {children}
    </Control>
  );
};

const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();

  const themeColor = useAppSelector((state) => state.theme.themeColor);
  const primaryColorLevel = useAppSelector(
    (state) => state.theme.primaryColorLevel,
  );

  const onThemeColorChange: SelectChangeHandler<ColorListOption> = (option) => {
    const { themeColor } = useConfig();
    dispatch(setThemeColor(option?.value ?? themeColor));
  };

  const onThemeColorLevelChange: SelectChangeHandler<ColorLevelListOption> = (
    option,
  ) => {
    const { primaryColorLevel } = useConfig();
    dispatch(setThemeColorLevel(option?.value ?? primaryColorLevel));
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Select<ColorListOption>
        size="sm"
        options={colorList}
        components={{
          Option: CustomSelectOption,
          Control: CustomControl,
        }}
        value={colorList.filter((color) => color.value === themeColor)}
        onChange={onThemeColorChange}
      />
      <Select<ColorLevelListOption>
        size="sm"
        options={colorLevelList}
        value={colorLevelList.filter(
          (color) => color.value === primaryColorLevel,
        )}
        onChange={onThemeColorLevelChange}
      />
    </div>
  );
};

export default ThemeSwitcher;
