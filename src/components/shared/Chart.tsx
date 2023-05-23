import React, { useCallback, useEffect, useMemo, useRef } from "react";
import ApexChart, { Props as ApexChartProps } from "react-apexcharts";
import {
  apexAreaChartDefaultOption,
  apexBarChartDefaultOption,
  apexDonutChartDefaultOption,
  apexLineChartDefaultOption,
} from "configs/chart.config";

const Chart = (props: ApexChartProps) => {
  const {
    series = [],
    width = "100%",
    height = 300,
    xAxis,
    customOptions,
    type = "line",
    direction,
    donutTitle,
    donutText,
    className,
    ...rest
  } = props;

  const chartRef = useRef<HTMLDivElement>(null);

  const chartDefaultOption = useMemo(() => {
    switch (type) {
      case "line":
        return apexLineChartDefaultOption;
      case "bar":
        return apexBarChartDefaultOption;
      case "area":
        return apexAreaChartDefaultOption;
      case "donut":
        return apexDonutChartDefaultOption;
      default:
        return apexLineChartDefaultOption;
    }
  }, [type]);

  let options = JSON.parse(JSON.stringify(chartDefaultOption));
  const isMobile = window.innerWidth < 768;

  const setLegendOffset = useCallback(() => {
    if (chartRef.current) {
      const legend = chartRef.current.querySelectorAll(
        "div.apexcharts-legend",
      )[0] as HTMLElement;
      if (direction === "rtl") {
        legend.style.right = "auto";
        legend.style.left = "0";
      }
      if (isMobile) {
        legend.style.position = "relative";
        legend.style.top = "0";
        legend.style.justifyContent = "start";
        legend.style.padding = "0";
      }
    }
  }, [direction, isMobile]);

  useEffect(() => {
    if (type !== "donut") {
      setLegendOffset();
    }
  }, [type, setLegendOffset]);

  if (type !== "donut") {
    options.xaxis.categories = xAxis;
  }

  if (customOptions) {
    options = { ...options, ...customOptions };
  }

  if (type === "donut") {
    if (donutTitle) {
      options.plotOptions.pie.donut.labels.total.label = donutTitle;
    }
    if (donutText) {
      options.plotOptions.pie.donut.labels.total.formatter = () => donutText;
    }
  }

  return (
    <div
      style={direction === "rtl" ? { direction: "ltr" } : {}}
      className="chartRef"
      ref={chartRef}
    >
      <ApexChart
        options={options}
        type={type}
        series={series}
        width={width}
        height={height}
        className={className}
        {...rest}
      />
    </div>
  );
};

export default Chart;
