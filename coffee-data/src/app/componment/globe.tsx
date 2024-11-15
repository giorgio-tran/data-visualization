"use client";
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import * as d3 from "d3";

// Dynamically import the Globe component with SSR disabled
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

type GlobeComponent = {
  category: "coffee_imports" | "coffee_exports" | "coffee_production";
  year: string;
};

export default function GlobeComponent(props: GlobeComponent) {
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();

  const category = props.category;
  const year = props.year;

  useEffect(() => {
    // load data from the local file in the public directory
    fetch("/data/coffee_data.geojson")
      .then((res) => res.json())
      .then((countries) => {
        setCountries({
          features: countries.features.filter(
            (item) => item.properties[category]
          ),
        });
      });
  }, [category, year]);

  const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

  // Calculate GDP per capita (avoiding countries with small populations)
  const getVal = (feat) => feat["properties"][category][year];

  // Find the max value to scale the color range
  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries]
  );

  colorScale.domain([0, maxVal]);

  if (countries.features.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        lineHoverPrecision={0}
        polygonsData={countries.features}
        polygonAltitude={(d) => (d === hoverD ? 0.12 : 0.01)}
        polygonCapColor={(d) =>
          d === hoverD ? "steelblue" : colorScale(getVal(d))
        }
        polygonSideColor={() => "rgba(0, 100, 0, 0.15)"}
        polygonStrokeColor={() => "#111"}
        polygonLabel={({ properties: d }) => `
          <b>${d.NAME_LONG}</b> <br />
          Coffee Import: <i>${d[category][year]}</i> kg<br/>
        `}
        onPolygonHover={setHoverD}
        polygonsTransitionDuration={300}
      />
    </div>
  );
}
