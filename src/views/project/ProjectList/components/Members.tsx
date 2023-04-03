import React from "react";
import UsersAvatarGroup from "components/shared/UsersAvatarGroup";
import { Member } from "../../../../mock/data/projectData";

const Members = ({ members }: { members: Member[] }) => {
  return <UsersAvatarGroup users={members} />;
};

export default Members;
