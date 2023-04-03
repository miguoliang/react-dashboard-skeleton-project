import React, { ReactNode } from "react";
import {
  HiCheckCircle,
  HiExclamation,
  HiInformationCircle,
  HiXCircle,
} from "react-icons/hi";
import { Status } from "../utils/constant";

type ColorSchema = {
  color: string;
  icon: JSX.Element;
};

const ICONS: Record<Status, ColorSchema> = {
  success: {
    color: "text-emerald-400",
    icon: <HiCheckCircle />,
  },
  info: {
    color: "text-blue-400",
    icon: <HiInformationCircle />,
  },
  warning: {
    color: "text-yellow-400",
    icon: <HiExclamation />,
  },
  danger: {
    color: "text-red-400",
    icon: <HiXCircle />,
  },
};

type StatusIconProps = Partial<{
  type: Status;
  custom: ReactNode;
  iconColor: string;
}>;

const StatusIcon = (props: StatusIconProps) => {
  const { type = "info", custom, iconColor } = props;

  const icon = ICONS[type];

  return (
    <span className={`text-2xl ${iconColor || icon.color}`}>
      {custom || icon.icon}
    </span>
  );
};

export default StatusIcon;
