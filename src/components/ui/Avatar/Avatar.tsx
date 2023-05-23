import React, { useEffect, useRef, useState } from "react";
import useMergedRef from "../hooks/useMergeRef";
import classNames from "classnames";
import { CustomRefElementProps, Shape, Size } from "../utils/constant";

export type AvatarProps = CustomRefElementProps<
  {
    size?: Size | number;
    shape?: Shape;
    icon?: React.ReactNode;
  },
  "img"
>;

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>((props, ref) => {
  const {
    size = "md",
    src,
    srcSet,
    shape = "rounded",
    alt,
    className,
    icon,
    ...rest
  } = props;

  let { children } = props;
  const [scale, setScale] = useState(1);

  const avatarChildren = useRef<HTMLSpanElement | null>();
  const avatarNode = useRef<HTMLSpanElement>();

  const avatarMergeRef = useMergedRef(ref, avatarNode);

  const innerScale = () => {
    const avatarChildrenWidth = avatarChildren.current?.offsetWidth ?? 0;
    const avatarNodeWidth = avatarNode.current?.offsetWidth ?? 0;
    if (avatarChildrenWidth === 0 || avatarNodeWidth === 0) {
      return;
    }
    setScale(
      avatarNodeWidth - 8 < avatarChildrenWidth
        ? (avatarNodeWidth - 8) / avatarChildrenWidth
        : 1,
    );
  };

  useEffect(() => {
    innerScale();
  }, [scale, children]);

  const sizeStyle =
    typeof size === "number"
      ? {
          width: size,
          height: size,
          minWidth: size,
          lineHeight: `${size}px`,
          fontSize: icon ? size / 2 : 12,
        }
      : {};

  const classes = classNames(
    "avatar",
    `avatar-${shape}`,
    typeof size === "string" ? `avatar-${size}` : "",
    className,
  );

  if (src) {
    children = (
      <img
        className={`avatar-img avatar-${shape}`}
        src={src}
        srcSet={srcSet}
        alt={alt}
        loading="lazy"
      />
    );
  } else if (icon) {
    children = (
      <span className={classNames("avatar-icon", `avatar-icon-${size}`)}>
        {icon}
      </span>
    );
  } else {
    const childrenSizeStyle =
      typeof size === "number" ? { lineHeight: `${size}px` } : {};
    const stringCentralized = {
      transform: `translateX(-50%) scale(${scale})`,
    };
    children = (
      <span
        className={`avatar-string ${
          typeof size === "number" ? "" : `avatar-inner-${size}`
        }`}
        style={{
          ...childrenSizeStyle,
          ...stringCentralized,
          ...(typeof size === "number" ? { height: size } : {}),
        }}
        ref={(node) => (avatarChildren.current = node)}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={classes}
      style={{ ...sizeStyle, ...rest.style }}
      ref={avatarMergeRef}
      {...rest}
    >
      {children}
    </span>
  );
});

export default Avatar;
