import React, { MouseEventHandler, useState } from "react";
import { Input } from "components/ui";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { InputProps } from "../ui/Input/Input";

type PasswordInputProps = {
  onVisibleChange?: (visible: boolean) => void;
} & InputProps;

const PasswordInput = (props: PasswordInputProps) => {
  const { onVisibleChange, ...rest } = props;

  const [pwInputType, setPwInputType] = useState("password");

  const onPasswordVisibleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    const nextValue = pwInputType === "password" ? "text" : "password";
    setPwInputType(nextValue);
    onVisibleChange?.(nextValue === "text");
  };

  return (
    <Input
      {...rest}
      type={pwInputType}
      suffix={
        <span
          className="cursor-pointer text-xl"
          onClick={(e) => onPasswordVisibleClick(e)}
        >
          {pwInputType === "password" ? <HiOutlineEyeOff /> : <HiOutlineEye />}
        </span>
      }
    />
  );
};

export default PasswordInput;
