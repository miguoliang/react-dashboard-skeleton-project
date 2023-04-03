import React from "react";
import { Avatar, AvatarGroup } from "components/ui";

const Group = () => {
  return (
    <AvatarGroup
      chained
      maxCount={4}
      omittedAvatarProps={{ shape: "circle" }}
      omittedAvatarTooltip
      onOmittedAvatarClick={() => console.log("Omitted Avatar Clicked")}
    >
      <Avatar shape="circle" src="/img/avatars/thumb-1.jpg" />
      <Avatar shape="circle" src="/img/avatars/thumb-2.jpg" />
      <Avatar shape="circle" src="/img/avatars/thumb-3.jpg" />
      <Avatar shape="circle" src="/img/avatars/thumb-4.jpg" />
      <Avatar shape="circle" src="/img/avatars/thumb-5.jpg" />
      <Avatar shape="circle" src="/img/avatars/thumb-6.jpg" />
    </AvatarGroup>
  );
};

export default Group;
