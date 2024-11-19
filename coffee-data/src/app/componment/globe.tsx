"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import * as d3 from "d3";

// Dynamically import the Globe component with SSR disabled
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

type GlobeComponent = {
  category: "coffee_imports" | "coffee_exports" | "coffee_production";
  year: string;
};

type PolygonLabel = {
  category: "coffee_imports" | "coffee_exports" | "coffee_production";
  country: string;
  weight: string;
};

function PolygonLabel(props: PolygonLabel) {
  const dynamicLabel = {
    coffee_imports: "Import",
    coffee_exports: "Export",
    coffee_production: "Production",
  };

  return (
    <div className="bg-black">
      <b>{props.country}</b>
      <div>
        Coffee {dynamicLabel[props.category]}: {props.weight} kg
      </div>
    </div>
  );
}

export default function GlobeComponent(props: GlobeComponent) {
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();

  const category = props.category;
  const year = props.year;

  const dynamicLabel = {
    coffee_imports: "Import",
    coffee_exports: "Export",
    coffee_production: "Production",
  };

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
  const getVal = useCallback(
    (feat: any) => feat["properties"][category]?.[year],
    [category, year]
  );

  // Find the max value to scale the color range
  const maxVal = useMemo(
    () => Math.max(...countries.features.map(getVal)),
    [countries, getVal]
  );

  colorScale.domain([0, maxVal]);

  if (countries.features.length === 0 && !category && !year) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center w-full mt-4">
      <div className="container w-full max-w-2xl h-full max-h-[600px] overflow-hidden flex justify-center items-center">
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
            <div id="polygon-label-parent">
              <div id="polygon-label-background"></div>
              <div id="polygon-label-text">
                <b>${d.NAME_LONG}</b> <br />
                Coffee ${dynamicLabel[category]}: <i>${d[category][year]}</i> kg<br/>
              </div>
            </div>
          `}
          onPolygonHover={setHoverD}
          polygonsTransitionDuration={300}
        />
      </div>
    </div>
  );
}
