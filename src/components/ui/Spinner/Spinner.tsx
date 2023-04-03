import React from "react";
import classNames from "classnames";
import { useConfig } from "../ConfigProvider";
import { CgSpinner } from "react-icons/cg";
import { IconType } from "react-icons";

const Spinner = (props: {
  size?: string | number;
  indicator?: IconType;
  isSpinning?: boolean;
  enableTheme?: boolean;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}) => {
  const {
    className,
    color,
    enableTheme = true,
    indicator = CgSpinner,
    isSpinning = true,
    size = 20,
    style,
    ...rest
  } = props;

  const { themeColor, primaryColorLevel } = useConfig();

  const spinnerColor =
    color || (enableTheme && `${themeColor}-${primaryColorLevel}`);

  const spinnerStyle: React.CSSProperties = {
    height: size,
    width: size,
    ...style,
  };

  const spinnerClass = classNames(
    isSpinning && "animate-spin",
    spinnerColor && `text-${spinnerColor}`,
    className,
  );

  const Indicator = indicator;

  return <Indicator style={spinnerStyle} className={spinnerClass} {...rest} />;
};

export default Spinner;
