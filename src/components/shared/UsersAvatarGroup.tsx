import React, { useMemo } from "react";
import { Tooltip } from "components/ui";
import acronym from "utils/acronym";
import useTwColorByName from "utils/hooks/useTwColorByName";
import {
  Avatar,
  AvatarGroup,
  AvatarGroupProps,
  AvatarProps,
} from "@chakra-ui/react";

type UsersAvatarGroupProps = {
  users?: Record<string, string>[];
  avatarProps?: AvatarProps;
  avatarGroupProps?: AvatarGroupProps;
  nameKey?: string;
  imgKey?: string;
  onAvatarClick?: (avatar: Record<string, string>) => void;
  chained?: boolean;
};

const UsersAvatarGroup = (props: UsersAvatarGroupProps) => {
  const {
    avatarGroupProps = {},
    avatarProps = {},
    imgKey = "img",
    nameKey = "name",
    onAvatarClick,
    users = [],
    ...rest
  } = props;

  const bgColor = useTwColorByName();

  const defaultAvatarProps = useMemo<AvatarProps>(() => {
    return {
      size: "md",
      className: "cursor-pointer",
      ...avatarProps,
    };
  }, [avatarProps]);
  const handleAvatarClick = (avatar: Record<string, string>) => {
    onAvatarClick?.(avatar);
  };
  return (
    <AvatarGroup chained {...avatarGroupProps} {...rest}>
      {users.map((elm, index) => (
        <Tooltip key={elm[nameKey] + index} title={elm[nameKey]}>
          <Avatar
            {...defaultAvatarProps}
            className={`${elm[imgKey] ? "" : bgColor(elm[nameKey])} ${
              defaultAvatarProps.className
            }`}
            src={elm[imgKey]}
            onClick={() => handleAvatarClick(elm)}
          >
            {acronym(elm.name)}
          </Avatar>
        </Tooltip>
      ))}
    </AvatarGroup>
  );
};

export default UsersAvatarGroup;
