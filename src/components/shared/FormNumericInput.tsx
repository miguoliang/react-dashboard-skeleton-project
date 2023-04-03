import React from "react";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import { Input } from "components/ui";
import { InputProps } from "../ui/Input/Input";

const NumberInput = ({
  suffix: inputSuffix,
  prefix: inputPrefix,
  ...props
}: InputProps) => {
  return (
    <Input
      {...props}
      value={props.value}
      suffix={inputSuffix}
      prefix={inputPrefix}
    />
  );
};

const NumberFormatInput = ({
  onValueChange,
  form,
  field,
  ...rest
}: NumberFormatProps<InputProps>) => {
  return (
    <NumberFormat
      customInput={NumberInput}
      onValueChange={onValueChange}
      form={form}
      field={field}
      onBlur={field?.onBlur}
      {...rest}
    />
  );
};

const FormNumericInput = ({
  form,
  field,
  suffix: inputSuffix,
  prefix: inputPrefix,
  onValueChange,
  ...rest
}: NumberFormatProps<InputProps>) => {
  return (
    <NumberFormatInput
      form={form}
      field={field}
      prefix={inputPrefix}
      suffix={inputSuffix}
      onValueChange={onValueChange}
      {...rest}
    />
  );
};

export default FormNumericInput;
