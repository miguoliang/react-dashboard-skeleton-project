import React from "react";
import { CustomRefElementProps } from "../ui/utils/constant";
import { useThemeStore } from "../../store";

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
  const mode = useThemeStore((state) => state.mode);
  return <img src={mode === "dark" ? darkModeSrc : src} alt={alt} {...rest} />;
};

export default DoubleSidedImage;
