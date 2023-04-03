import React, {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useContext,
  useState,
} from "react";
import classNames from "classnames";
import CheckboxGroupContext from "./context";
import { useConfig } from "../ConfigProvider";

export type CheckboxEventHandler = (
  checked: boolean,
  event: ChangeEvent<HTMLInputElement>,
) => void;

export type CheckboxProps = {
  labelRef?: string;
  onChange?: CheckboxEventHandler;
  checked?: boolean;
  defaultChecked?: boolean;
  color?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  children?: React.ReactNode;
  name?: string;
  value?: string | number;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const {
      name: nameContext,
      value: groupValue,
      onChange: onGroupChange,
      color: colorContext,
    } = useContext(CheckboxGroupContext);

    const {
      color,
      className,
      onChange,
      children,
      disabled,
      readOnly,
      name = nameContext,
      defaultChecked = false,
      value,
      checked: controlledChecked,
      labelRef,
      ...rest
    } = props;

    const { themeColor, primaryColorLevel } = useConfig();

    const isChecked = useCallback(() => {
      if (typeof groupValue !== "undefined" && typeof value !== "undefined") {
        return groupValue.some((i) => i === value);
      }
      return controlledChecked || defaultChecked;
    }, [controlledChecked, groupValue, value, defaultChecked]);

    const [checkboxChecked, setCheckboxChecked] = useState(isChecked());

    const onCheckboxChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        let nextChecked = !checkboxChecked;

        if (typeof groupValue !== "undefined") {
          nextChecked = !groupValue.includes(value);
        }

        if (disabled || readOnly) {
          return;
        }

        setCheckboxChecked(nextChecked);
        onChange?.(nextChecked, e);
        onGroupChange?.(value, nextChecked, e);
      },
      [
        checkboxChecked,
        disabled,
        readOnly,
        setCheckboxChecked,
        onChange,
        value,
        onGroupChange,
        groupValue,
      ],
    );

    const checkboxColor =
      color || colorContext || `${themeColor}-${primaryColorLevel}`;

    const checkboxDefaultClass = `checkbox text-${checkboxColor}`;
    const checkboxColorClass = disabled && "disabled";
    const labelDefaultClass = `checkbox-label`;
    const labelDisabledClass = disabled && "disabled";

    const checkBoxClass = classNames(checkboxDefaultClass, checkboxColorClass);

    const labelClass = classNames(
      labelDefaultClass,
      labelDisabledClass,
      className,
    );

    return (
      <label ref={labelRef} className={labelClass}>
        <input
          ref={ref}
          className={checkBoxClass}
          type="checkbox"
          disabled={disabled}
          readOnly={readOnly}
          onChange={onCheckboxChange}
          name={name}
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
  },
);

export default Checkbox;
