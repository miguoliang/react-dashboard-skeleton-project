import React, {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { useConfig } from "../ConfigProvider";
import { useForm } from "../Form/context";
import { useInputGroup } from "../InputGroup/context";
import { CONTROL_SIZES, CustomRefElementProps } from "../utils/constant";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import get from "lodash/get";
import { FieldInputProps, FormikProps } from "formik";

export type InputProps = CustomRefElementProps<
  {
    asElement?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
    className?: string;
    disabled?: boolean;
    invalid?: boolean;
    prefix?: React.ReactNode;
    size?: keyof typeof CONTROL_SIZES;
    suffix?: React.ReactNode;
    textArea?: boolean;
    type?: string;
    style?: CSSProperties;
    unstyle?: boolean;
    field?: FieldInputProps<string>;
    form?: FormikProps<any>;
    placeholder?: string;
  },
  "input"
>;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    asElement: Component = "input",
    className,
    disabled,
    invalid,
    prefix,
    size,
    suffix,
    textArea,
    type = "text",
    style,
    unstyle = false,
    field,
    form,
    placeholder,
    ...rest
  } = props;

  const [prefixGutter, setPrefixGutter] = useState(0);
  const [suffixGutter, setSuffixGutter] = useState(0);

  const { themeColor, controlSize, primaryColorLevel, direction } = useConfig();
  const formControlSize = useForm().size;
  const inputGroupSize = useInputGroup().size;

  const inputSize = size || inputGroupSize || formControlSize || controlSize;

  const isInvalid = useMemo(() => {
    let validate = false;
    if (!isEmpty(form)) {
      const { touched, errors } = form;
      const touchedField = get(touched, field?.name ?? "");
      const errorField = get(errors, field?.name ?? "");
      validate = !!(touchedField && errorField);
    }
    if (typeof invalid === "boolean") {
      validate = invalid;
    }
    return validate;
  }, [form, invalid, field]);

  const inputDefaultClass = "input";
  const inputSizeClass = `input-${inputSize} h-${CONTROL_SIZES[inputSize]}`;
  const inputFocusClass = `focus:ring-${themeColor}-${primaryColorLevel} focus-within:ring-${themeColor}-${primaryColorLevel} focus-within:border-${themeColor}-${primaryColorLevel} focus:border-${themeColor}-${primaryColorLevel}`;
  const inputWrapperClass = `input-wrapper ${
    prefix || suffix ? className : ""
  }`;
  const inputClass = classNames(
    inputDefaultClass,
    !textArea && inputSizeClass,
    !isInvalid && inputFocusClass,
    !prefix && !suffix ? className : "",
    disabled && "input-disabled",
    isInvalid && "input-invalid",
    textArea && "input-textarea"
  );

  const prefixNode = useRef<HTMLElement | null>(null);
  const suffixNode = useRef<HTMLElement | null>(null);

  const getAffixSize = () => {
    if (!prefixNode.current && !suffixNode.current) {
      return;
    }
    const prefixNodeWidth = prefixNode.current?.offsetWidth;
    const suffixNodeWidth = suffixNode.current?.offsetWidth;

    if (isNil(prefixNodeWidth) && isNil(suffixNodeWidth)) {
      return;
    }

    if (prefixNodeWidth) {
      setPrefixGutter(prefixNodeWidth);
    }

    if (suffixNodeWidth) {
      setSuffixGutter(suffixNodeWidth);
    }
  };

  useEffect(() => {
    getAffixSize();
  }, [prefix, suffix]);

  const remToPxConversion = (pixel: number) => 0.0625 * pixel;

  const affixGutterStyle = () => {
    const leftGutter = `${remToPxConversion(prefixGutter) + 1}rem`;
    const rightGutter = `${remToPxConversion(suffixGutter) + 1}rem`;
    const gutterStyle: CSSProperties = {};

    if (direction === "ltr") {
      if (prefix) {
        gutterStyle.paddingLeft = leftGutter;
      }

      if (suffix) {
        gutterStyle.paddingRight = rightGutter;
      }
    }

    if (direction === "rtl") {
      if (prefix) {
        gutterStyle.paddingRight = leftGutter;
      }

      if (suffix) {
        gutterStyle.paddingLeft = rightGutter;
      }
    }

    return gutterStyle;
  };

  const inputProps = {
    className: !unstyle ? inputClass : "",
    disabled,
    type,
    ref,
    ...field,
    ...rest,
  };

  const renderInput = (
    <Component
      style={{ ...affixGutterStyle(), ...style }}
      placeholder={placeholder}
      {...inputProps}
    />
  );

  const renderAffixInput = (
    <span className={inputWrapperClass}>
      {prefix ? (
        <div
          className="input-suffix-start"
          ref={(node) => (prefixNode.current = node)}
        >
          {" "}
          {prefix}{" "}
        </div>
      ) : null}
      {renderInput}
      {suffix ? (
        <div
          className="input-suffix-end"
          ref={(node) => (suffixNode.current = node)}
        >
          {suffix}
        </div>
      ) : null}
    </span>
  );

  const renderChildren = () => {
    if (textArea) {
      return React.createElement("textarea", {
        ...inputProps,
        style: { ...style },
        placeholder,
      });
    }

    if (prefix || suffix) {
      return renderAffixInput;
    } else {
      return renderInput;
    }
  };

  return renderChildren();
});

export default Input;
