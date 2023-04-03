import React, { ReactNode } from "react";
import classNames from "classnames";
import Line from "./Line";
import Circle from "./Circle";
import { useConfig } from "../ConfigProvider";

type ProgressProps = Partial<{
  color: string;
  customInfo: ReactNode | string;
  gapDegree: number;
  gapPosition: "top" | "bottom" | "left" | "right";
  percent: number;
  showInfo: boolean;
  size: "sm" | "md";
  strokeLinecap: "round" | "square";
  strokeWidth: number;
  variant: "line" | "circle";
  width: number | string;
  className: string;
}>;

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (props, ref) => {
    const {
      variant = "line",
      color,
      percent = 0,
      showInfo = true,
      customInfo,
      className,
      width = 120,
    } = props;

    const { themeColor, primaryColorLevel } = useConfig();

    const renderProcessInfo = () => {
      if (!showInfo) {
        return null;
      }
      return (
        <span className={`progress-info ${variant}`}>
          {customInfo || `${percent}%`}
        </span>
      );
    };

    const strokeColor = color || `${themeColor}-${primaryColorLevel}`;

    const progressTrailColor = "gray-100";

    const progressClass = classNames(
      "progress",
      className,
      variant === "circle" ? "circle" : "line"
    );

    const renderProgress = (direction: "top" | "right" | "bottom" | "left") => {
      const progressInfo = renderProcessInfo();
      let progress;

      if (variant === "line") {
        progress = (
          <Line
            strokeColor={strokeColor}
            direction={direction}
            trailColor={progressTrailColor}
            {...props}
          >
            {progressInfo}
          </Line>
        );
      }

      if (variant === "circle") {
        progress = (
          <Circle
            strokeColor={strokeColor}
            trailColor={progressTrailColor}
            width={width}
            {...props}
          >
            {progressInfo}
          </Circle>
        );
      }

      return progress;
    };

    return (
      <div ref={ref} className={progressClass}>
        {renderProgress("left")}
      </div>
    );
  }
);

export default Progress;
