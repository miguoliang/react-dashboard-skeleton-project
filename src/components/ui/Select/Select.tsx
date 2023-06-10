import React from "react";
import classNames from "classnames";
import { ReactComponentLike } from "prop-types";
import ReactSelect, {
  ClearIndicatorProps,
  ControlProps,
  MultiValue,
  OptionProps,
  Props,
  SingleValue,
  StylesConfig,
  Theme,
} from "react-select";
import tw, { theme } from "twin.macro";
import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import { useConfig } from "../ConfigProvider";
import { useForm } from "../Form/context";
import { useInputGroup } from "../InputGroup/context";
import { HiCheck, HiChevronDown, HiX } from "react-icons/hi";
import { CONTROL_SIZES, FormFieldType, Size } from "../utils/constant";
import { FormikState } from "formik/dist/types";
import { Spinner } from "@chakra-ui/react";

const DefaultOption = ({
  innerProps,
  label,
  isSelected,
  isDisabled,
  isFocused,
}: OptionProps) => {
  const { themeColor } = useConfig();
  return (
    <div
      className={classNames(
        "select-option",
        isSelected && "selected",
        isDisabled && "disabled",
        isFocused && "focused",
      )}
      {...innerProps}
    >
      <span className="ml-2">{label}</span>
      {isSelected && (
        <HiCheck className={`text-${themeColor} dark:text-white text-xl`} />
      )}
    </div>
  );
};

const DefaultDropdownIndicator = () => {
  return (
    <div className="select-dropdown-indicator">
      <HiChevronDown />
    </div>
  );
};

const DefaultClearIndicator = (props: ClearIndicatorProps) => {
  const {
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div {...restInnerProps} ref={ref}>
      <div className="select-clear-indicator">
        <HiX />
      </div>
    </div>
  );
};

const DefaultLoadingIndicator = () => {
  const { themeColor } = useConfig();
  return <Spinner className={`select-loading-indicatior text-${themeColor}`} />;
};

type SelectProps<T = unknown, IsMulti extends boolean = false> = Partial<{
  size: Size;
  componentAs: ReactComponentLike;
  style: Omit<StylesConfig, "control" | "input" | "menu">;
  field: FormFieldType;
  form: FormikState<any>;
  cacheOptions: boolean;
  defaultOptions: boolean;
  loadOptions: (inputValue: string, callback: (v: T[]) => void) => void;
}> &
  Omit<Props<T, IsMulti>, "form">;

export type SelectChangeHandler<
  T = unknown,
  IsMulti extends boolean = false,
> = (newValue: IsMulti extends false ? SingleValue<T> : MultiValue<T>) => void;

const Select = function <T, IsMulti extends boolean = false>(
  props: SelectProps<T, IsMulti>,
) {
  const {
    size,
    style,
    className,
    form,
    field,
    components,
    componentAs: Component = ReactSelect,
    ...rest
  } = props;

  const { themeColor, controlSize, primaryColorLevel, mode } = useConfig();
  const formControlSize = useForm().size;
  const inputGroupSize = useInputGroup().size;

  const selectSize = size || inputGroupSize || formControlSize || controlSize;

  let isInvalid = false;

  if (!isEmpty(form) && !isEmpty(field)) {
    const { touched, errors } = form;

    const touchedField = get(touched, field.name ?? "");
    const errorField = get(errors, field.name ?? "");

    isInvalid = !!(touchedField && errorField);
  }

  const twColor = theme<any>`colors`;

  const getBoxShadow = (state: ControlProps) => {
    const shadowBase = "0 0 0 1px ";

    if (isInvalid) {
      return shadowBase + twColor.red["500"];
    }

    if (state.isFocused) {
      return shadowBase + twColor[themeColor][primaryColorLevel];
    }

    return "none";
  };

  const styles: StylesConfig = {
    control: (provided, state) => {
      return {
        ...provided,
        height: theme`height`[CONTROL_SIZES[selectSize]],
        minHeight: theme`height`[CONTROL_SIZES[selectSize]],
        "&:hover": {
          boxShadow: getBoxShadow(state),
          cursor: "pointer",
        },
        boxShadow: getBoxShadow(state),
        borderRadius: tw`rounded-md`.borderRadius as string,
        ...(isInvalid ? { borderColor: twColor.red["500"] } : {}),
      };
    },
    input: (css) => {
      return {
        ...css,
        input: {
          outline: "none",
          outlineOffset: 0,
          boxShadow: "none !important",
        },
      };
    },
    menu: (provided) => ({ ...provided, zIndex: 50 }),
    ...style,
  };

  const selectClass = classNames("select", `select-${selectSize}`, className);

  return (
    <Component
      className={selectClass}
      classNamePrefix={"select"}
      styles={styles}
      theme={(thm: Theme) => ({
        ...thm,
        colors: {
          ...thm.colors,
          neutral20:
            mode === "dark" ? twColor.gray["600"] : twColor.gray["300"],
          neutral30:
            mode === "dark" ? twColor.gray["600"] : twColor.gray["300"],
          neutral80: twColor.gray["700"],
          primary25: twColor[themeColor]["50"],
          primary50: twColor[themeColor]["100"],
          primary: twColor[themeColor][primaryColorLevel],
        },
      })}
      themeColor={`${themeColor}-${primaryColorLevel}`}
      components={{
        IndicatorSeparator: () => null,
        Option: DefaultOption,
        LoadingIndicator: DefaultLoadingIndicator,
        DropdownIndicator: DefaultDropdownIndicator,
        ClearIndicator: DefaultClearIndicator,
        ...components,
      }}
      {...field}
      {...rest}
    />
  );
};
export default Select;
