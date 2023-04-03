import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
} from "react-simple-maps";
import { csvParse, DSVRowArray } from "d3-dsv";
import useUniqueId from "components/ui/hooks/useUniqueId";

const geoUrl = "/data/features.json";

const colorScale = scaleLinear([0.29, 0.68], ["#ffedea", "#ff5233"]);

const ChoroplethMap = () => {
  const [data, setData] = useState<DSVRowArray>(csvParse(""));

  useEffect(() => {
    csv("/data/vulnerability.csv").then((data) => {
      setData(data);
    });
  }, []);

  return (
    <ComposableMap
      height={200}
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 80,
      }}
    >
      <Sphere
        stroke="#E4E5E6"
        strokeWidth={0.5}
        fill="#E4E5E6"
        id={useUniqueId("sphere")}
      />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={d ? colorScale(Number(d["2017"])) : "#F5F4F6"}
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  );
};

export default ChoroplethMap;
