import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import classNames from "classnames";
import RadioGroupContext from "./context";
import { useConfig } from "../ConfigProvider";
import { FormikState } from "formik/dist/types";
import { FormFieldType } from "../utils/constant";

type RadioProps = Partial<{
  checked: boolean;
  disabled: boolean;
  defaultChecked: boolean;
  color: string;
  onChange: (value: any, event: ChangeEvent<HTMLInputElement>) => void;
  labelRef: string;
  value: any;
  field: FormFieldType;
  vertical: boolean;
  form: FormikState<any>;
}> &
  Omit<JSX.IntrinsicElements["input"], "onChange">;

const Radio = React.forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const {
    name: nameContext,
    disabled: disabledContext,
    value: groupValue,
    onChange: onGroupChange,
    color: colorContext,
    vertical: verticalContext,
    radioGutter,
  } = useContext(RadioGroupContext);

  const {
    children,
    className,
    checked: checkedProp,
    color,
    defaultChecked,
    disabled = disabledContext,
    field,
    id,
    labelRef,
    name = nameContext,
    onChange,
    readOnly,
    value,
    vertical = verticalContext,
    ...rest
  } = props;

  const { themeColor, primaryColorLevel } = useConfig();

  const getChecked = () => {
    return typeof groupValue !== "undefined"
      ? groupValue === value
      : checkedProp;
  };

  const [radioChecked, setRadioChecked] = useState(getChecked());

  const radioColor =
    color || colorContext || `${themeColor}-${primaryColorLevel}`;

  const controlProps = useMemo(() => {
    if (typeof groupValue !== "undefined") {
      return { checked: radioChecked };
    }
    return { checked: checkedProp, defaultChecked };
  }, [radioChecked, checkedProp, defaultChecked, groupValue]);

  const onRadioChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) {
        return;
      }
      onGroupChange?.(value, e);
      onChange?.(value, e);
    },
    [
      disabled,
      setRadioChecked,
      onChange,
      value,
      onGroupChange,
      groupValue,
      readOnly,
    ],
  );

  useEffect(() => {
    const propChecked = getChecked();
    if (radioChecked !== propChecked) {
      setRadioChecked(propChecked);
    }
  }, [value, checkedProp, groupValue]);

  const radioDefaultClass = `radio text-${radioColor}`;
  const radioColorClass = disabled && "disabled";
  const labelDisabledClass = disabled && "disabled";

  const radioClass = classNames(radioDefaultClass, radioColorClass);
  const labelClass = classNames(
    "radio-label",
    labelDisabledClass,
    className,
    `${"inline-flex"}`,
    `${radioGutter ? "m" + (vertical ? "b-" : "r-") + radioGutter : ""}`,
  );

  return (
    <label ref={labelRef} className={labelClass}>
      <input
        id={id}
        ref={ref}
        type="radio"
        className={radioClass}
        disabled={disabled}
        value={value}
        onChange={onRadioChange}
        name={name}
        readOnly={readOnly}
        {...controlProps}
        {...field}
        {...rest}
      />
      {children ? (
        <span
          className={classNames(
            "ltr:ml-2 rtl:mr-2",
            disabled ? "opacity-50" : "",
          )}
        >
          {children}
        </span>
      ) : null}
    </label>
  );
});

export default Radio;
