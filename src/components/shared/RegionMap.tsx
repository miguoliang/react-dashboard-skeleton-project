import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import WorldMap from "assets/maps/world-countries-sans-antarctica.json";
import shadeColor from "utils/shadeColor";
import ReactTooltip from "react-tooltip";
import { theme } from "twin.macro";
import { useAppSelector } from "store/hooks";

const twColor = theme<any>`colors`;

const geoUrl = WorldMap;
const hoverPercentage = -10;

const getHighlightedRegion = (
  name: string,
  data: {
    name: string;
    color: string;
  }[],
  defaultMapColor: string,
) => {
  if (data.length > 0 || name) {
    for (let i = 0; i < data.length; i++) {
      const elm = data[i];
      if (name === elm.name) {
        return elm.color;
      }
    }
    return defaultMapColor;
  }
  return defaultMapColor;
};
const getRegionHoverColor = (
  name: string,
  data: {
    name: string;
    color: string;
  }[],
  defaultMapColor = "",
) => {
  if (data.length > 0 || name) {
    for (let i = 0; i < data.length; i++) {
      const elm = data[i];
      if (name === elm.name) {
        return shadeColor(elm.color, hoverPercentage);
      }
    }
    return shadeColor(defaultMapColor, hoverPercentage);
  }
  return shadeColor(defaultMapColor, hoverPercentage);
};
const getRegionValue = (
  name: string,
  data: {
    name: string;
    color: string;
  }[],
  suffix = "",
  prefix = "",
) => {
  if (data.length > 0 || name) {
    for (let i = 0; i < data.length; i++) {
      const elm = data[i];
      if (name === elm.name) {
        return `${elm.name} - ${prefix}${elm.color}${suffix}`;
      }
    }
    return "";
  }
  return "";
};

type MapChartProps = {
  setTooltipContent?: (content: string) => void;
  data: Array<{
    name: string;
    color: string;
  }>;
  mapSource?: object;
  suffix?: string;
  prefix?: string;
};

const MapChart = (props: MapChartProps) => {
  const { setTooltipContent, data, mapSource, suffix, prefix } = props;

  const mode = useAppSelector((state) => state.theme.mode);
  return (
    <ComposableMap
      style={{ transform: "translateY(20px)" }}
      data-tip=""
      height={380}
      projectionConfig={{ scale: 145 }}
    >
      <Geographies geography={mapSource}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const geoName = geo.properties.name;
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  setTooltipContent?.(
                    getRegionValue(geoName, data, suffix, prefix),
                  );
                }}
                onMouseLeave={() => {
                  setTooltipContent?.("");
                }}
                strokeWidth={2}
                fill={getHighlightedRegion(
                  geoName,
                  data,
                  mode === "dark" ? twColor.gray["500"] : twColor.gray["100"],
                )}
                stroke={
                  mode === "dark" ? twColor.gray["600"] : twColor.gray["300"]
                }
                style={{
                  hover: {
                    fill: getRegionHoverColor(
                      geoName,
                      data,
                      mode === "dark"
                        ? twColor.gray["500"]
                        : twColor.gray["100"],
                    ),
                    outline: "none",
                  },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};
const Map = (props: MapChartProps) => {
  const [content, setContent] = useState("");
  return (
    <>
      <MapChart {...props} setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </>
  );
};

const RegionMap = (props: MapChartProps) => {
  const {
    data = [],
    mapSource = geoUrl,
    suffix: valueSuffix,
    prefix: valuePrefix,
  } = props;
  return (
    <Map
      data={data}
      mapSource={mapSource}
      prefix={valuePrefix}
      suffix={valueSuffix}
    />
  );
};

export default RegionMap;
