import React, {
  CSSProperties,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useState,
} from "react";
import classNames from "classnames";
import useTimeout from "../hooks/useTimeout";
import StatusIcon from "../StatusIcon";
import { Status } from "../utils/constant";
import { CloseButton } from "@chakra-ui/react";

type NotificationProps = Partial<{
  duration: number;
  onClose: MouseEventHandler;
  type: Status;
  title: ReactNode;
  closable: boolean;
  width: number;
  customIcon: ReactNode;
  children: ReactNode | (() => ReactNode);
  className: string;
  triggerByToast: boolean;
  style: CSSProperties;
}>;

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  (props, ref) => {
    const {
      duration = 3000,
      onClose,
      type,
      title,
      closable = false,
      className,
      children,
      width = 350,
      customIcon,
      triggerByToast = false,
      style,
      ...rest
    } = props;

    const [display, setDisplay] = useState("show");

    const { clear } = useTimeout(onClose, duration, duration > 0);

    const handleClose: MouseEventHandler = useCallback(
      (e) => {
        setDisplay("hiding");
        onClose?.(e);
        clear();
        if (!triggerByToast) {
          setTimeout(() => {
            setDisplay("hide");
          }, 400);
        }
      },
      [onClose, clear, triggerByToast],
    );

    const notificationClass = classNames("notification", className);

    if (display === "hide") {
      return null;
    }

    return (
      <div
        ref={ref}
        {...rest}
        className={notificationClass}
        style={{ width: width, ...style }}
      >
        <div
          className={classNames(
            "notification-content",
            !children && "no-child",
          )}
        >
          {type && !customIcon ? (
            <div className="mr-3">
              <StatusIcon type={type} />
            </div>
          ) : null}
          {customIcon && <div className="mr-3">{customIcon}</div>}
          <div className="mr-4">
            {title && (
              <div
                className={classNames("notification-title", children && "mb-1")}
              >
                {title}
              </div>
            )}
            <div className="notification-description">
              {typeof children === "function" ? children() : children}
            </div>
          </div>
        </div>
        {closable && (
          <CloseButton
            className="notification-close"
            position={"absolute"}
            onClick={handleClose}
          />
        )}
      </div>
    );
  },
);

export default Notification;
