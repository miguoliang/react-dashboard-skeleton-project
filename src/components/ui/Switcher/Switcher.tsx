import React, {
  ChangeEvent,
  ChangeEventHandler,
  forwardRef,
  ReactNode,
  useEffect,
} from "react";
import classNames from "classnames";
import Spinner from "../Spinner";
import { useConfig } from "../ConfigProvider";
import { useBoolean } from "@chakra-ui/react";

const Switcher = forwardRef<
  HTMLInputElement,
  {
    name?: string;
    checked?: boolean;
    checkedContent?: ReactNode;
    className?: string;
    color?: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
    labelRef?: React.RefObject<HTMLLabelElement>;
    onChange?: (checked: boolean, e: ChangeEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    unCheckedContent?: ReactNode;
    value?: string;
  }
>((props, ref) => {
  const {
    checked = false,
    checkedContent,
    className,
    color,
    defaultChecked,
    disabled,
    isLoading = false,
    labelRef,
    onChange,
    readOnly,
    unCheckedContent,
    ...rest
  } = props;

  const { themeColor, primaryColorLevel } = useConfig();

  const [switcherChecked, setSwitcherChecked] = useBoolean(
    defaultChecked || checked || false,
  );

  useEffect(() => {
    checked ? setSwitcherChecked.on() : setSwitcherChecked.off();
  }, [checked]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (disabled || readOnly || isLoading) {
      return;
    }
    const nextChecked = !switcherChecked;
    nextChecked ? setSwitcherChecked.on() : setSwitcherChecked.off();
    onChange?.(nextChecked, e);
  };

  const switcherColor = color || `${themeColor}-${primaryColorLevel}`;

  const switcherClass = classNames(
    "switcher",
    switcherChecked &&
      `switcher-checked bg-${switcherColor} dark:bg-${switcherColor}`,
    disabled && "switcher-disabled",
    className,
  );

  return (
    <label ref={labelRef} className={switcherClass}>
      <input
        ref={ref}
        type="checkbox"
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        {...rest}
      />
      {isLoading ? (
        <Spinner
          className={classNames(
            "switcher-toggle-loading",
            switcherChecked
              ? "switcher-checked-loading"
              : "switcher-uncheck-loading",
          )}
        />
      ) : (
        <div className="switcher-toggle" />
      )}
      <span className="switcher-content">
        {switcherChecked ? checkedContent : unCheckedContent}
      </span>
    </label>
  );
});
export default Switcher;
