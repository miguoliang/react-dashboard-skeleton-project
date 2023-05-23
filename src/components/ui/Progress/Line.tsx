import React from "react";
import classNames from "classnames";

const Line = (
  props: Partial<{
    percent: number;
    size: string;
    children: React.ReactNode;
    strokeColor: string;
    direction: "top" | "bottom" | "left" | "right";
    trailColor: string;
  }>,
) => {
  const { percent, size, children, strokeColor } = props;

  const progressBackgroundClass = classNames(
    "progress-bg",
    size === "sm" ? "h-1.5" : "h-2",
    `bg-${strokeColor}`,
  );

  return (
    <>
      <div className="progress-wrapper">
        <div className="progress-inner">
          <div
            className={progressBackgroundClass}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      {children}
    </>
  );
};

export default Line;
