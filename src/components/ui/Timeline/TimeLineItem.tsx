import React, { forwardRef } from "react";
import classNames from "classnames";

export type TimeLineItemProps = {
  media?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  isLast?: boolean;
};

const TimeLineItem = forwardRef<HTMLLIElement, TimeLineItemProps>(
  (props, ref) => {
    const { children, className, isLast, media } = props;

    return (
      <li
        className={classNames(
          "timeline-item",
          isLast ? "timeline-item-last" : "",
          className
        )}
        ref={ref}
      >
        <div className="timeline-item-wrapper">
          <div className="timeline-item-media">
            <div className="timeline-item-media-content">
              {media || <div className="timeline-item-media-default" />}
            </div>
            {!isLast && <div className="timeline-connect" />}
          </div>
          <div
            className={classNames(
              "timeline-item-content",
              isLast && "timeline-item-content-last"
            )}
          >
            {children}
          </div>
        </div>
      </li>
    );
  }
);

export default TimeLineItem;
