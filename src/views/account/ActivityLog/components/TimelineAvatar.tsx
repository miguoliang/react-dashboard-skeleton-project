import React, { useMemo } from "react";
import { Avatar } from "components/ui";
import acronym from "utils/acronym";
import useTwColorByName from "utils/hooks/useTwColorByName";
import {
  HiDocumentText,
  HiTag,
  HiTicket,
  HiUserCircle,
  HiXCircle,
} from "react-icons/hi";
import {
  ADD_FILES_TO_TICKET,
  ADD_TAGS_TO_TICKET,
  avatarType,
  CREATE_TICKET,
  iconType,
  UPDATE_TICKET,
} from "../constants";
import { AvatarProps } from "../../../../components/ui/Avatar/Avatar";
import { LogEvent } from "mock/data/accountData";

const Icon = ({ type }: { type: string }) => {
  switch (type) {
    case ADD_TAGS_TO_TICKET:
      return <HiTag />;
    case ADD_FILES_TO_TICKET:
      return <HiDocumentText />;
    case UPDATE_TICKET:
      return <HiXCircle />;
    case CREATE_TICKET:
      return <HiTicket />;
    default:
      return <HiUserCircle />;
  }
};

const TimelineAvatar = ({ data }: { data: LogEvent }) => {
  const color = useTwColorByName();

  const defaultAvatarProps = useMemo(
    () => ({ size: 30, shape: "circle" } as AvatarProps),
    [],
  );

  if (avatarType.includes(data.type)) {
    const avatarProps = data.userImg
      ? { src: data.userImg }
      : { className: `${color(data.userName || "")}` };

    return (
      <Avatar {...avatarProps} {...defaultAvatarProps}>
        {acronym(data.userName || "")}
      </Avatar>
    );
  }

  if (iconType.includes(data.type)) {
    return (
      <Avatar
        className="text-gray-700 bg-gray-200 dark:text-gray-100 dark:text-gray-100"
        icon={<Icon type={data.type} />}
        {...defaultAvatarProps}
      />
    );
  }

  return null;
};

export default TimelineAvatar;
