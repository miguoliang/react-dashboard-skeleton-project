import React from "react";
import { useAppSelector } from "store/hooks";
import { CustomRefElementProps } from "../ui/utils/constant";

type DoubleSidedImageProps = CustomRefElementProps<
  {
    darkModeSrc: string;
  },
  "img"
>;

const DoubleSidedImage = ({
  src,
  darkModeSrc,
  alt,
  ...rest
}: DoubleSidedImageProps) => {
  const mode = useAppSelector((state) => state.theme.mode);

  return <img src={mode === "dark" ? darkModeSrc : src} alt={alt} {...rest} />;
};

export default DoubleSidedImage;
