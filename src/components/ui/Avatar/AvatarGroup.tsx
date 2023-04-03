import React, {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";
import classNames from "classnames";
import Avatar, { AvatarProps } from "./Avatar";
import Tooltip from "../Tooltip";

export type AvatarGroupProps = {
  maxCount?: number;
  chained?: boolean;
  className?: string;
  omittedAvatarTooltip?: boolean;
  onOmittedAvatarClick?: () => void;
  omittedAvatarProps?: AvatarProps;
  omittedAvatarContent?: ReactNode;
  children?: ReactNode;
};

type GroupContainerProps = {
  children: ReactNode;
  chained?: boolean;
  className?: string;
};

const GroupContainer = ({
  children,
  chained,
  className,
}: GroupContainerProps) => (
  <div
    className={classNames(
      "avatar-group",
      chained && "avatar-group-chained",
      className
    )}
  >
    {children}
  </div>
);

const AvatarGroup = (props: AvatarGroupProps) => {
  const {
    maxCount = 3,
    chained = false,
    className,
    omittedAvatarTooltip = false,
    onOmittedAvatarClick,
    omittedAvatarProps,
    omittedAvatarContent,
    children,
  } = props;

  const childCount = Children.count(children);

  const childWithKey = Children.toArray(children)
    .filter((child) => isValidElement(child))
    .map((child, index) =>
      cloneElement(child as ReactElement, {
        key: `grouped-avatar-${index}`,
      })
    );

  if (maxCount && maxCount < childCount) {
    const childToShow = childWithKey.slice(0, maxCount);
    const overflowCount = childCount - maxCount;

    const avatar = (
      <Avatar
        className={onOmittedAvatarClick ? "cursor-pointer" : ""}
        onClick={() => onOmittedAvatarClick?.()}
        {...omittedAvatarProps}
      >
        {omittedAvatarContent || `+${overflowCount}`}
      </Avatar>
    );
    childToShow.push(
      omittedAvatarTooltip ? (
        <Tooltip key="avatar-more-tooltip" title={`${overflowCount} More`}>
          <>{avatar}</>
        </Tooltip>
      ) : (
        <Fragment key="avatar-more-tooltip">{avatar}</Fragment>
      )
    );
    return (
      <GroupContainer className={className} chained={chained}>
        {childToShow}
      </GroupContainer>
    );
  }
  return (
    <GroupContainer className={className} chained={chained}>
      {children}
    </GroupContainer>
  );
};

export default AvatarGroup;
